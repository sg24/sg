importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");


const matchUrl = ({url, event}) => {
    return (url.href  === 'https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700');
}

workbox.routing.registerRoute(
    matchUrl,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google-fonts',
        plugins: [
            new workbox.expiration.Plugin({
              maxAgeSeconds: 24 * 60 * 60 * 7 * 30,
              maxEntries: 3
            }),
        ]     
    }
));



self.addEventListener('notificationclick', function(event) {
    var notification = event.notification;
    var action = event.action;
  
    if (action === 'confirm'  || action === 'cancel') {
      notification.close();
    } else {
      event.waitUntil(
        clients.matchAll()
          .then(function(clis) {
            var client = clis.find(function(c) {
              return c.visibilityState === 'visible';
            });
  
            if (client !== undefined) {
              client.navigate(notification.data.url);
              client.focus();
            } else {
              clients.openWindow(notification.data.url);
            }
            notification.close();
          })
      );
    }
  });
  
  self.addEventListener('push', function(event) {
    var data = {title: 'New Notification from Teachers/Student', content: 'Required your attension!', openUrl: '/'};
  
    if (event.data) {
      data = JSON.parse(event.data.text());
    }
    
    var options = {
      body: data.content,
      icon: '/icons/sg-icon-96x96.png',
      badge: '/icons/sg-icon-96x96.png',
      data: {
        url: data.openUrl
      }
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  
workbox.precaching.precacheAndRoute([
  {
    "url": "favicon.ico",
    "revision": "ba8e03ced45b48fc4abef3ce84d5f963"
  },
  {
    "url": "manifest.json",
    "revision": "3ca8b7d6c1c2428f6578f163cf250f63"
  },
  {
    "url": "static/css/css/2.2fe65d49.chunk.css",
    "revision": "5b973bff2aa31d3d9775e8e54740530d"
  },
  {
    "url": "static/css/css/main.6a9c55c1.chunk.css",
    "revision": "35670cae58787e1d9f9c6ed81ce61225"
  },
  {
    "url": "static/css/main.342e57df.chunk.css",
    "revision": "0167b8193576e9114af137a829fb649d"
  },
  {
    "url": "static/css/main.ad2c23ce.chunk.css",
    "revision": "e7a49db3f8dd3ff2b88c5006cf799928"
  },
  {
    "url": "static/media/Logo.7a8e6dba.svg",
    "revision": "7a8e6dba7c873ae05990fa23b1ad5c07"
  },
  {
    "url": "static/media/logo.e88880ec.svg",
    "revision": "e88880ecacdf53ff5fa4a8e8850852bd"
  },
  {
    "url": "stylesheets/global.css",
    "revision": "9d767589e2c689b137a0e074f60e1f8f"
  },
  {
    "url": "stylesheets/miniglobal.css",
    "revision": "122e5cbd69e349995453eccdf97dffdb"
  }
]);
  


