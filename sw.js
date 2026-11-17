const V='phtg-v6',A=['./','index.html','offline.html','css/styles.css','js/app.js','js/manage.js','js/learn.js','js/extra.js','manifest.webmanifest','favicon.svg','favicon.ico','apple-touch-icon.png','icons/icon-192.png','icons/icon-512.png','assets/hero-truck.svg','assets/empty-state.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(A))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data=='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{if(e.request.method!='GET')return;
if(e.request.mode=='navigate'){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('offline.html'))));return}
e.respondWith(fetch(e.request).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put(e.request,c));return n}).catch(()=>caches.match(e.request)))});