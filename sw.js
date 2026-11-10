const CACHE = 'ollie-aac-v14-icon';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', event => {event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate', event => {event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(key=>(key.startsWith('my-words-aac-') || key.startsWith('ollie-aac-')) && key!==CACHE).map(key=>caches.delete(key)))),self.clients.claim()]));});
self.addEventListener('fetch', event => {if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).then(response=>{
    if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
    return response;
  }).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('./index.html'))));
}else{
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
}});
