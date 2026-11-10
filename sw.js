const CACHE = 'ollie-aac-v12';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png','./art/water.png','./art/food.png','./art/milk.png','./art/toilet.png','./art/help.png','./art/hug.png','./art/more.png','./art/stop.png','./art/yes.png','./art/no.png','./art/play.png','./art/rest.png','./art/happy.png','./art/sad.png','./art/hurt.png','./art/angry.png','./art/mama.png','./art/papa.png'];
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
