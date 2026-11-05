(function(){
 for(const form of document.querySelectorAll('.wp-block-marino-form')){
  if(form.method.toLowerCase()!=='post'||!form.querySelector('[name="access_key"]'))continue;
  const status=document.createElement('p');status.className='nh-form-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');form.append(status);
  form.addEventListener('submit',async function(event){event.preventDefault();if(!form.reportValidity())return;const button=form.querySelector('[type="submit"]'),label=button.textContent;button.disabled=true;button.textContent='Sending…';status.textContent='';
   try{const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});let data;try{data=await response.json();}catch{data={};}if(!response.ok||data.success===false)throw Error('Submission rejected');form.reset();status.textContent='Message sent. Thank you for reaching out. We will get back to you soon.';}catch{status.textContent='Something went wrong. Please try again.';}finally{button.disabled=false;button.textContent=label;}
  });
 }
})();
