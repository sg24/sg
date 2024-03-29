import axios from '../../../axios';
let publickey =  typeof window !== `undefined` ? document.cookie.replace(/(?:(?:^|.*;\s*)pushMsg\s*\=\s*([^;]*).*$)|^.*$/, "$1") : null;

function displayConfirmNotification() {
    return new Promise((resolve, reject) => {
      if ('serviceWorker' in navigator) {
        var options = {
          body: 'You successfully subscribed to Slodge24 Notification service!',
          icon: '/icons/sg-icon-96x96.png',
          dir: 'ltr',
          lang: 'en-US',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          requireInteraction: true,
          badge: '/icons/sg-icon-96x96.png',
          tag: 'confirm-notification',
          renotify: true,
          actions: [
            { action: 'confirm', title: 'Okay' },
            { action: 'cancel', title: 'Cancel' }
          ]
        };
    
        navigator.serviceWorker.ready
          .then(function(swreg) {
            swreg.showNotification('Successfully subscribed!', options);
            resolve()
          });
      } else {
        reject()
      }
    })
  }
  
  function configurePushSub() {
    return new Promise((resolve, reject) => {
      if (!('serviceWorker' in navigator)) {
        return;
      }
      var reg;
      navigator.serviceWorker.ready
        .then(function(swreg) {
          reg = swreg;
          return swreg.pushManager.getSubscription();
        })
        .then(function(sub) {
          if (sub === null) {
            let vapidPublicKey = publickey;
            let convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
            return reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidPublicKey
            });
          } else {
            return sub
          }
        })
        .then(function(newSub) {
          let sub = JSON.stringify(newSub);
          return axios.post('/users', null,{headers: {'data-categ': `subscribe==${sub}`}})
        })
        .then(function(res) {
          if (res.status === 200) {
            displayConfirmNotification().then(() =>{
              resolve()
            });
          }
        })
        .catch(function(err) {
          reject(err)
        });
    })
  }

 export function requestPermission() {
  return new Promise((resolve, reject) => {
    Notification.requestPermission(function(result) {
      if (result !== 'granted') {
        reject(result)
      } else {
        configurePushSub().then(() => {
          resolve()
        });
      }
    });
  })
 }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }