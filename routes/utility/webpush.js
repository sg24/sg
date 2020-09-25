let webpush = require('web-push');
let { user } = require('../../serverDB/serverDB');

const pushNotification = (userID, title, desc, image, url) => (
    new Promise((resolve, reject) => {
        user.findById(userID).then(user => {
            if (!user) {
                resolve()
                return
            }
            if (user.enableNotification) {
                var pushConfig = {
                    endpoint: subUsers.subscription[0].endpoint,
                    keys: {
                    auth: subUsers.subscription[0].keys.auth,
                    p256dh: subUsers.subscription[0].keys.p256dh
                    }
                };
                var pushOptions = {
                    vapidDetails: {
                        subject: "https://www.slodge24.com",
                        privateKey: subUsers.pushMsg[0].privatekey,
                        publicKey: subUsers.pushMsg[0].publickey
                    },
                    headers: {}
                };
                function checkCnt(cnt) {
                    return String(cnt).length < 50 ?  cnt : String(cnt).substr(0, 50) + '...'
                }
                let isImage = content.image && content.image.length > 0 ? {image:  content.image[0]} : {}; 
                webpush.sendNotification(pushConfig, JSON.stringify({
                    title: checkCnt(title),
                    content: checkCnt(desc),
                    openUrl: url,
                    image: image
                }), pushOptions)
            } else {
                resolve()
            }
        })
    }).catch(err => {
        resolve()
    })
)

module.exports = pushNotification