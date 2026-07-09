const CACHE='project-fa5-v3';
const FILES=['./','index.html','assets/css/app.css','assets/js/app.js','data/project.json','manifest.webmanifest','assets/icons/icon-192.png','assets/icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
