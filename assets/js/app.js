const projectDataUrl = 'data/project.json';
let deferredPrompt;
const pageNames={home:'Início',vehicle:'Veículo',service:'Serviços',timeline:'Histórico',docs:'Documentos',settings:'Sistema'};
function setPage(page){document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===page));document.querySelectorAll('[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===page));document.getElementById('pageTitle').textContent=pageNames[page]||'Project FA5';}
document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>setPage(b.dataset.page)));
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;});
document.getElementById('installBtn').addEventListener('click',async()=>{if(deferredPrompt){deferredPrompt.prompt(); deferredPrompt=null;} else alert('No celular, use “Adicionar à tela inicial” no menu do navegador.');});
function item(label,value){return `<div class="item"><span>${label}</span><b>${value}</b></div>`}
function render(data){
 const systems=['Motor','Combustível','Freios','Suspensão','Elétrica','Transmissão'];
 const health=document.getElementById('healthGrid');
 health.innerHTML=systems.map((s,i)=>`<article class="health-card"><div class="health-ring">${i===2?'--':'OK'}</div><small>${i===2?'Monitorar':'Operacional'}</small><b>${s}</b></article>`).join('');
 document.getElementById('maintenanceList').innerHTML=data.maintenance.map(m=>item(m.item,`${m.due}<br><small>${m.note}</small>`)).join('');
 document.getElementById('miniTimeline').innerHTML=data.timeline.slice(0,3).map(t=>`<div class="timeline-item"><b>${t.title}</b><small>${t.date} • ${t.confidence}</small></div>`).join('');
 const v=data.vehicle;
 document.getElementById('vehicleInfo').innerHTML=[['Projeto',v.project],['Veículo',v.name],['Ano',v.year],['Cor',v.color],['Motor',v.engine],['Câmbio',v.transmission],['Quilometragem',v.mileage],['Início',v.started],['Aquisição',v.acquired],['URL',v.url]].map(([a,b])=>`<div class="cert-cell"><small>${a}</small><b>${b}</b></div>`).join('');
 document.getElementById('configList').innerHTML=data.configuration.map(c=>item(c.system,`${c.value}<br><small>${c.status}</small>`)).join('');
 document.getElementById('serviceList').innerHTML=data.serviceRecords.map(r=>`<article class="service-card"><small>Registro ${r.id} • ${r.date} • ${r.mileage}</small><h4>${r.title}</h4><p>${r.description}</p><span class="status-dot"></span><small>${r.status}</small></article>`).join('');
 document.getElementById('timelineList').innerHTML=data.timeline.map(t=>`<div class="timeline-item"><b>${t.title}</b><small>${t.date} • ${t.confidence}</small><p>${t.detail}</p></div>`).join('');
}
fetch(projectDataUrl).then(r=>r.json()).then(render).catch(()=>console.warn('data load failed'));
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').catch(()=>{});}
