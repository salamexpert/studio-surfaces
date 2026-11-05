"""Deploy only the block theme; never replace the WordPress root or import content."""
import argparse
import base64
import hashlib
import io
import json
import os
from pathlib import Path
import shlex
import uuid

HOST = '83.171.249.183'
PIN = 'SHA256:ioVqxfYaJ/pThHu0qa3gNYGruSPD/429Gz0A6nTdtgE'
ROOT = '/home/marinoceramictile/public_html'
THEME = 'marino-ceramic-fse'
SOURCE = Path(__file__).resolve().parents[1] / 'wordpress-theme' / THEME


def validate():
    for name in ('style.css', 'functions.php', 'theme.json', 'templates/index.html'):
        if not (SOURCE / name).is_file():
            raise RuntimeError('Missing theme file: ' + name)
    json.loads((SOURCE / 'theme.json').read_text(encoding='utf-8-sig'))
    files = []
    allowed = {'.php', '.css', '.js', '.json', '.html', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.ico', '.webmanifest', '.woff', '.woff2', '.txt', '.md'}
    for path in SOURCE.rglob('*'):
        if path.is_symlink():
            raise RuntimeError('Symlinks are prohibited')
        if path.is_file():
            if path.suffix.lower() not in allowed or path.name.startswith('.'):
                raise RuntimeError('Unexpected deployment file: ' + path.name)
            files.append(path)
    return sorted(files)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--validate', action='store_true')
    args = parser.parse_args()
    files = validate()
    print(f'Validated {len(files)} theme files')
    if args.validate:
        return
    import paramiko

    class PinnedHost(paramiko.MissingHostKeyPolicy):
        def missing_host_key(self, client, hostname, key):
            actual = 'SHA256:' + base64.b64encode(hashlib.sha256(key.asbytes()).digest()).decode().rstrip('=')
            if hostname != HOST or actual != PIN:
                raise RuntimeError('SSH host identity mismatch')

    host = os.environ.get('VPS_HOST', HOST).strip()
    if host != HOST:
        raise RuntimeError('Unexpected deployment host')
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(PinnedHost())
    key_text = os.environ.get('VPS_SSH_KEY', '')
    key = None
    if key_text:
        for kind in (paramiko.Ed25519Key, paramiko.RSAKey, paramiko.ECDSAKey):
            try:
                key = kind.from_private_key(io.StringIO(key_text), password=os.environ.get('VPS_SSH_PASSPHRASE') or None)
                break
            except (ValueError, paramiko.SSHException):
                continue
        if key is None:
            raise RuntimeError('Could not load deployment key')
    password = os.environ.get('MARINO_SSH_PASSWORD') if not key else None
    if not key and not password:
        raise RuntimeError('No SSH deployment credential configured')
    client.connect(host, username='root', pkey=key, password=password, look_for_keys=False, allow_agent=False, timeout=30)
    client.get_transport().set_keepalive(10)

    def run(command):
        stdin, stdout, stderr = client.exec_command(command, timeout=180)
        stdin.channel.shutdown_write()
        output, error = stdout.read().decode(), stderr.read().decode()
        if stdout.channel.recv_exit_status():
            raise RuntimeError(error or output or 'Remote command failed')
        return output.strip()

    wp = f'wp --allow-root --path={shlex.quote(ROOT)} '
    try:
        if run(wp + 'option get home').rstrip('/') != 'https://marinoceramictile.com':
            raise RuntimeError('Wrong WordPress installation')
        if run(wp + 'option get stylesheet') != THEME:
            raise RuntimeError('Active theme differs; refusing to switch themes')
        release = uuid.uuid4().hex
        parent = ROOT + '/wp-content/themes/'
        stage = parent + '.' + THEME + '-stage-' + release
        target = parent + THEME
        previous = parent + '.' + THEME + '-previous-' + release
        sftp = client.open_sftp()
        existing = sftp.lstat(target)
        import stat
        if not stat.S_ISDIR(existing.st_mode):
            raise RuntimeError('Theme target must be a real directory')
        sftp.mkdir(stage)
        for path in files:
            relative = path.relative_to(SOURCE).as_posix()
            directory = stage
            for part in relative.split('/')[:-1]:
                directory += '/' + part
                try:
                    sftp.stat(directory)
                except FileNotFoundError:
                    sftp.mkdir(directory)
            remote = stage + '/' + relative
            sftp.put(str(path), remote)
            sftp.chmod(remote, 0o644)
            sftp.chown(remote, existing.st_uid, existing.st_gid)
        sftp.close()
        # One locked process owns switch and rollback. Backups are never deleted.
        remote_code = '''
import fcntl, hashlib, os, pathlib, subprocess, urllib.request
def wp(*args):
    return subprocess.check_output(['wp','--allow-root','--path='+ROOT,*args], text=True).strip()
def protected():
    return {p:hashlib.sha256(pathlib.Path(ROOT,p).read_bytes()).hexdigest() for p in ('wp-config.php','.htaccess') if pathlib.Path(ROOT,p).exists()}
with open('/root/marino-theme-deployment.lock','a') as lock:
    fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
    assert wp('option','get','stylesheet') == 'marino-ceramic-fse'
    before = protected()
    owner = os.stat(TARGET)
    for directory, dirs, files in os.walk(STAGE):
        os.chown(directory,owner.st_uid,owner.st_gid)
        os.chmod(directory,0o755)
        for filename in files:
            if filename.endswith('.php'):
                subprocess.run(['php','-l',os.path.join(directory,filename)],check=True,stdout=subprocess.DEVNULL)
    os.rename(TARGET,PREVIOUS)
    try:
        os.rename(STAGE,TARGET)
        subprocess.run(['wp','--allow-root','--path='+ROOT,'cache','flush'],check=True)
        assert wp('eval','echo wp_is_block_theme() ? "yes" : "no";') == 'yes'
        for route in ('/','/blog/','/contact/'):
            req=urllib.request.Request('https://marinoceramictile.com'+route,headers={'User-Agent':'Marino-Theme-QA'})
            with urllib.request.urlopen(req,timeout=30) as response:
                assert response.status == 200
                body=response.read().lower()
                assert b'<html' in body and b'critical error' not in body
        assert protected() == before
    except BaseException:
        if os.path.exists(TARGET): os.rename(TARGET,STAGE)
        os.rename(PREVIOUS,TARGET)
        subprocess.run(['wp','--allow-root','--path='+ROOT,'cache','flush'])
        raise
    print('Theme deployed; health checks passed. Backup: '+PREVIOUS)
'''
        assignments = '\n'.join(name + '=' + repr(value) for name, value in [('ROOT', ROOT), ('STAGE', stage), ('TARGET', target), ('PREVIOUS', previous)])
        print(run('python3 -c ' + shlex.quote(assignments + '\n' + remote_code)))
    finally:
        client.close()


if __name__ == '__main__':
    main()
