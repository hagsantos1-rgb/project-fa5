const pages=[...document.querySelectorAll('.page')];
const dashboardBlocks=[...document.querySelectorAll('.dashboard-only')];
const buttons=[...document.querySelectorAll('[data-page]')];
function openPage(id){
  pages.forEach(p=>p.classList.toggle('active',p.id===id));
  dashboardBlocks.forEach(b=>b.classList.toggle('hidden',id!=='dashboard'));
  buttons.forEach(b=>b.classList.toggle('active',b.dataset.page===id));
  window.scrollTo({top:0,behavior:'smooth'});
}
buttons.forEach(b=>b.addEventListener('click',()=>openPage(b.dataset.page)));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>openPage(b.dataset.go)));
let deferredPrompt;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;});
document.getElementById('installBtn')?.addEventListener('click',async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;}else{alert('No celular, use o menu do navegador e escolha “Adicionar à tela inicial”.')}});
if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').catch(()=>{});}
