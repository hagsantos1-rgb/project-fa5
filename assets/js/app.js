const buttons=[...document.querySelectorAll('.nav-item')];
const pages=[...document.querySelectorAll('.page')];
buttons.forEach(btn=>btn.addEventListener('click',()=>{
  const target=btn.dataset.page;
  buttons.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  pages.forEach(p=>p.classList.toggle('active',p.id===target));
  window.scrollTo({top:0,behavior:'smooth'});
}));
let deferredPrompt;
window.addEventListener('beforeinstallprompt', e=>{e.preventDefault();deferredPrompt=e;});
document.getElementById('installBtn')?.addEventListener('click',async()=>{if(deferredPrompt){deferredPrompt.prompt();deferredPrompt=null;}else alert('Use o menu do navegador para adicionar à tela inicial.');});
if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').catch(()=>{});}
