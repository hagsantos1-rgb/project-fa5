const CACHE='project-fa5-v25';
const ASSETS=['./','./index.html','./assets/css/style.css','./assets/js/app.js','./manifest.webmanifest','./cartao_qr_project_fa5_github.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{event.respondWith(caches.match(event.request).then(res=>res||fetch(event.request))) });
