// if (!('serviceWorker' in navigator)) {
//     return;
//   }

// var reg;
// navigator.serviceWorker.ready
//     .then(function(swreg) {
//         reg = swreg;
//         return swreg.pushManager.getSubscription();
//     })
//     .then(function(sub) {
//         if (sub === null) {
//         // Create a new subscription
//         var vapidPublicKey = '';
//         var convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
//         return reg.pushManager.subscribe({
//             userVisibleOnly: true,
//             applicationServerKey: convertedVapidPublicKey
//         });
//         } else {
//         // We have a subscription
//         }
//     })
//     .then(function(newSub) {
//         return fetch('https://pwagram-e6b44.firebaseio.com/subscriptions.json', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify(newSub)
//         })
//     })
//     .then(function(res) {
//         if (res.ok) {
//         displayConfirmNotification();
//         }
//     })

// .catch(function(err) {
//     console.log(err);
// });