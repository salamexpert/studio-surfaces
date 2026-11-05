(function(){
 for(const form of document.querySelectorAll('.wp-block-marino-form')){
  if(form.method.toLowerCase()!=='post'||!form.querySelector('[name="access_key"]'))continue;
  const status=document.createElement('p');status.className='nh-form-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');form.append(status);
  form.addEventListener('submit',async function(event){event.preventDefault();if(!form.reportValidity())return;const button=form.querySelector('[type="submit"]'),label=button.textContent;button.disabled=true;button.textContent='Sending…';status.textContent='';
   const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
   try{const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'},signal:controller.signal});const data=await response.json();if(!response.ok||data?.success!==true)throw Error('Submission rejected');form.reset();status.textContent='Message sent. Thank you for reaching out. We will get back to you soon.';}catch{status.textContent='Something went wrong. Please try again.';}finally{clearTimeout(timeout);button.disabled=false;button.textContent=label;}
  });
 }
})();
