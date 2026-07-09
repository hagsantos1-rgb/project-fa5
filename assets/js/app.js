const initialServices = [
  { no: '001', title: 'Registro inicial do veículo', date: '08/07/2026', km: '200.925 km', notes: 'Configuração atual documentada. Histórico anterior indisponível.', status: 'Concluído' }
];
const storageKey = 'project-fa5-services-v1';
const services = JSON.parse(localStorage.getItem(storageKey) || 'null') || initialServices;
function saveServices(){ localStorage.setItem(storageKey, JSON.stringify(services)); }
function renderServices(){
  const list = document.getElementById('serviceList');
  if(!list) return;
  list.innerHTML = services.map(s => `
    <article class="service-item">
      <div class="service-number">${s.no}</div>
      <div><h3>${s.title}</h3><p>${s.date} • ${s.km}</p><p>${s.notes || ''}</p></div>
      <span class="service-status">${s.status || 'Concluído'}</span>
    </article>`).join('');
}
document.querySelectorAll('[data-nav]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const id = btn.dataset.nav;
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById(id)?.classList.add('active');
    document.querySelectorAll('.tabbar button').forEach(b=>b.classList.toggle('active', b.dataset.nav===id));
    window.scrollTo({top: 110, behavior: 'smooth'});
  });
});
const dialog = document.getElementById('serviceDialog');
document.getElementById('newServiceBtn')?.addEventListener('click',()=>dialog.showModal());
document.getElementById('saveService')?.addEventListener('click',(e)=>{
  e.preventDefault();
  const no = String(services.length + 1).padStart(3,'0');
  const title = document.getElementById('serviceTitle').value || 'Novo serviço';
  const dateRaw = document.getElementById('serviceDate').value;
  const date = dateRaw ? dateRaw.split('-').reverse().join('/') : 'Data a definir';
  const km = document.getElementById('serviceKm').value || 'Km a definir';
  const notes = document.getElementById('serviceNotes').value || '';
  services.push({no,title,date,km,notes,status:'Concluído'});
  saveServices(); renderServices(); dialog.close();
});
let deferredPrompt;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; });
document.querySelector('[data-action="install"]')?.addEventListener('click', async()=>{
  if(deferredPrompt){ deferredPrompt.prompt(); deferredPrompt = null; }
  else alert('No celular, use o menu do navegador e escolha “Adicionar à tela inicial”.');
});
if('serviceWorker' in navigator){ window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{})); }
renderServices();
