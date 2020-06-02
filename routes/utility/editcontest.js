const webpush = require('web-push');
const { user, authUser, tempFile} = require('../../serverDB/serverDB');
const deleteMedia = require('./deletemedia');

module.exports = editForm = (content, model, mediaCnt, userModel, userID, shareMe, tempFileID) => {
   return new Promise ((resolve, reject) => {
    let id = null;
    let removedMedia = content.removedmedia ? JSON.parse(content.removedmedia) : [];

    let updates = {
        video: mediaCnt.video,
        image: mediaCnt.image,
        nickname: content.nickname,
        account: content.account,
        bank: content.bank,
        paypal: content.paypal,
        phone: content.phone,
        snapshot: mediaCnt.snapshot,
        _isCompleted: false
    }; 

    model.findOneAndUpdate({_id: content.id, authorID: userID.authorID}, updates).then(result => {
        id = result._id;
        
        removeMedia(removedMedia).then(() => {
            notification();
        });

        
        function removeMedia(removedMedia) {
            return new Promise((resolve,reject) => {
                if (removedMedia.length > 0) {
                    let deleted = 0;
                    for (let media of removedMedia) {
                        if (media.type === 'video' || media.type === 'snapshot' ){
                            deleteMedia([media], 'image').then(() => {
                                deleteMedia([{id: media.videoCnt}], 'media').then(() => {
                                    ++deleted;
                                    if (deleted === removedMedia.length) {
                                        resolve();
                                    }
                                })
                            })
                        } else {
                           deleteMedia([media], 'image').then(() => {
                                ++deleted;
                                if (deleted === removedMedia.length) {
                                    resolve();
                                }
                            })
                        }
                    }
                } else {
                    resolve()
                }
            })
        }

        function notification() {
            tempFile.findByIdAndRemove(tempFileID).then(() => {
                completeSubmit();
            })
            function completeSubmit() {
                userModel.findById(userID.authorID).then(result => {
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
                                            content: 'Face of slodge24 contest',
                                            openUrl: `/contest/chat/${id}`
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