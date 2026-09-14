// Marino Ceramic Tile — minimal runtime (mobile menu toggle).
(function () {
  var t = document.querySelector('[data-mc-toggle]'), m = document.querySelector('[data-mc-mobile]');
  if (t && m) t.addEventListener('click', function () {
    var open = m.hasAttribute('hidden');
    if (open) m.removeAttribute('hidden'); else m.setAttribute('hidden', '');
    t.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();
