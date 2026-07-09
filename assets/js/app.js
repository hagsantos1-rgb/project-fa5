const pages=document.querySelectorAll('.page');
const buttons=document.querySelectorAll('.nav-item');
const title=document.getElementById('pageTitle');
buttons.forEach(btn=>btn.addEventListener('click',()=>{
  buttons.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  pages.forEach(p=>p.classList.remove('active'));
  document.getElementById(btn.dataset.page).classList.add('active');
  title.textContent=btn.textContent;
  window.scrollTo({top:0,behavior:'smooth'});
}));
let deferredPrompt;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;});
document.getElementById('installBtn')?.addEventListener('click',async()=>{if(deferredPrompt){deferredPrompt.prompt();deferredPrompt=null}else alert('No celular, use “Adicionar à tela inicial” pelo navegador.');});
if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').catch(()=>{});}
