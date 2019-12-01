const STATIC_FILES = [
    'https://use.fontawesome.com/releases/v5.0.13/js/all.js',
    'https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700',
    'serviceWorker.js'
]

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open('cdn')
            .then(function(cache){
                cache.addAll(STATIC_FILES);
            })
    )
})

self.addEventListener('activate', function(event){
    return self.clients.claim()
})

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request.url)
            .then(function(res){
                if (res) {
                    return res;
                }
                return fetch(event.request.url)
                    .then(function(res){
                        return res
                    })

            })
            .catch(function(request){
                return fetch(event.request.url)
                .then(function(res){
                    return res
                })
            })
    )
})