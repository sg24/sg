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

workbox.precaching.precacheAndRoute([]);
  


