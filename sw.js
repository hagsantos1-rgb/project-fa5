const CACHE='project-fa5-v2';
const ASSETS=['./','./index.html','./assets/css/style.css','./assets/js/app.js','./manifest.webmanifest','./cartao_qr_project_fa5_github.png','./assets/icons/icon-192.png','./assets/icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
