var cacheName = 'petstore-v1'
var cacheFiles = [
    ' index.html',
    'product. js',
    'petstore. webmanifest',
    ' images/petstore.png'
     ];

     self.addEventListener('instal', (e) => {
        console.log('[Service Worker] Install');
        e.waitUntil(
            caches.open(cacheName).then((cache) => {
                console.log('[Service Worker] caching all the files');
                return cache.addAll(cacheFiles);

            })
        );
     });

     self.addEventListener('fetch', function (e) {
        e.respondWith(
            caches.match(e.request).then(function (r) {
                return r || fetch(e.request).fetch(e.request).then(function (response){
                    return caches.open(cacheName).then(function (cache){
                        cache.put(e.request, response.clone());
                        return response;
                    });
                });
            })
        );
     });