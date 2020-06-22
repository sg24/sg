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
    var data = {title: 'New Notification from Friend', content: 'Required your attension!', openUrl: '/'};
  
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
    "revision": "b7fde4e2ad76bac8a4a1efd4f79ab151"
  }
]);
  


