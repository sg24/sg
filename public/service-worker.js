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
    "url": "static/css/main.fc1a7775.chunk.css",
    "revision": "a80ccfd8c409feb9d4683c49811eb991"
  },
  {
    "url": "static/media/logo.e88880ec.svg",
    "revision": "e88880ecacdf53ff5fa4a8e8850852bd"
  }
]);
  


