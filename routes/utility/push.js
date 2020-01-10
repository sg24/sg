const { user, authUser} = require('../../serverDB/serverDB');

module.exports = push = (shareMe, content, field, id) => {
    return new Promise((resolve, reject) => {
        let allSubscription = [];
        user.find({_id: { $in : shareMe }}).then(users => {
            let fndUsers = users ? users : []
            allSubscription.push(...fndUsers);
            authUser.find({_id: { $in : shareMe }}).then(authUsers => {
                let fndAuthUser = authUsers ? authUsers : [];
                allSubscription.push(...fndAuthUser);
                let send = 0;
                if (allSubscription && allSubscription.length < 1) {
                    resolve()
                    return
                }
        
                for (let subUsers of allSubscription) {
                    if (subUsers.enableNotification) {
                        var pushConfig = {
                            endpoint: subUsers.subscription[0].endpoint,
                            keys: {
                              auth: subUsers.subscription[0].keys.auth,
                              p256dh: subUsers.subscription[0].keys.p256dh
                            }
                          };
                          var pushOptions = {
                            vapidDetails: {
                                subject: "https://slodge24.com",
                                privateKey: subUsers.pushMsg[0].privatekey,
                                publicKey: subUsers.pushMsg[0].publickey
                            },
                            headers: {}
                        };
                        let isImage = content.image && content.image.length > 0 ? {image:  content.image[0]} : {}; 
                          webpush.sendNotification(pushConfig, JSON.stringify({
                            title: String(content.title).length < 50 ? String(content.title) : String(content.title).substr(0, 50)+'...',
                            content: String(JSON.parse(content.desc).blocks[0].text).length < 50 ? String(JSON.parse(content.desc).blocks[0].text): 
                            String(JSON.parse(content.desc).blocks[0].text).substr(0, 50)+'...',
                            openUrl: `/view/${field}/${id}`
                          }), pushOptions).then(() => {
                              ++send;
                              if (send === allSubscription.length) {
                                resolve()
                              }
                          })
                            .catch((err) => {
                                ++send;
                                if (send === allSubscription.length) {
                                  resolve()
                                }
                            })
                    } else {
                        ++send;
                        if (send === allSubscription.length) {
                          resolve()
                        }
                    }
                }
            })
        })
    })
}
