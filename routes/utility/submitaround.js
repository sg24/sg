let notifications = require('./notifications');
const webpush = require('web-push');
const { user, authUser, tempFile} = require('../../serverDB/serverDB');
module.exports = submitForm = (content, model, mediaCnt, userModel, userID, shareMe, tempFileID) => {
   return new Promise ((resolve, reject) => {
    let id = null;
    let newDoc = new model({
        authorID: userID.authorID,
        username: userID.username, 
        userImage: userID.userImage,
        userType: userID.userType,
        video: mediaCnt.video,
        image: mediaCnt.image,
        post: content.post,
        snapshot: mediaCnt.snapshot
    }); 

    newDoc.save().then(result => {
        id = result._id;
        notification();

        function notification() {
            tempFile.findByIdAndRemove(tempFileID).then(() => {
                completeSubmit();
            })
            function completeSubmit() {
                userModel.findByIdAndUpdate(userID.authorID, { $inc: {'aroundme': 1}}).then(result => {
                    if (result.enableNotification) {
                        let allSubscription = [];
                        user.find({_id: { $in : shareMe }}).then(users => {
                            let fndUsers = users ? users : []
                            allSubscription.push(...fndUsers);
                            authUser.find({_id: { $in : shareMe }}).then(authUsers => {
                                let fndAuthUser = authUsers ? authUsers : [];
                                allSubscription.push(...fndAuthUser);
                                let send = 0;
                                if (allSubscription && allSubscription.length < 1) {
                                    model.findByIdAndUpdate(id, {_isCompleted: true}).then(() => {
                                        resolve(id)
                                    })
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
                                                subject: "https://www.slodge24.com",
                                                privateKey: subUsers.pushMsg[0].privatekey,
                                                publicKey: subUsers.pushMsg[0].publickey
                                            },
                                            headers: {}
                                        };
                                          webpush.sendNotification(pushConfig, JSON.stringify({
                                            title: userID.username,
                                            content: content.post,
                                            openUrl: `/aroundme/chat/${id}`
                                          }), pushOptions).then(() => {
                                              ++send;
                                              if (send === allSubscription.length) {
                                                model.findByIdAndUpdate(id, {_isCompleted: true}).then(() => {
                                                    resolve(id)
                                                })
                                              }
                                          })
                                            .catch((err) => {
                                                ++send;
                                                if (send === allSubscription.length) {
                                                  model.findByIdAndUpdate(id, {_isCompleted: true}).then(() => {
                                                      resolve(id)
                                                  })
                                                }
                                            })
                                    } else {
                                        ++send;
                                        if (send === allSubscription.length) {
                                          model.findByIdAndUpdate(id, {_isCompleted: true}).then(() => {
                                              resolve(id)
                                          })
                                        }
                                    }
                                }
                            })
                        })
                    } else {
                        model.findByIdAndUpdate(id, {_isCompleted: true}).then(() => {
                            resolve(id)
                        })
                    }
                }).catch(err => {
                    reject(err)
                })
            }
        }
    }).catch(err => {
        reject(err)
    })
   })
}