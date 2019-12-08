let notifications = require('./notifications');
const webpush = require('web-push');
const { user, authUser} = require('../../serverDB/serverDB');

module.exports = submitForm = (content, model, files, notify, viewnotify, userModel, userID, updateField, userField, field, res, category) => {
   return new Promise ((resolve, reject) => {
    let categRaw = String(content.categ).split(',');
    let categ = [...new Set(categRaw)];
    let shareMe = content.shareMe !== '' ? String(content.shareMe).split(',') : [];
    let id = null;
    let fileID = [];

    for( let file of files) {
        fileID.push({id: file.id, type: file.contentType, snapshotID: file.filename});
    }

    let newDoc = new model({
        authorID: Date.now(),
        category: categ,
        video: fileID,
        image: content.image,
        shareMe,
        title: content.title,
        desc: content.desc,
        mode: content.mode,
        snapshot: content.snapshot !== undefined ? JSON.parse(content.snapshot) : []
    }); 

    newDoc.save().then(result => {
        id = result._id;

        function notification() {
            notifications(shareMe, notify, id, updateField).then(() =>{
                viewnotify.findOneAndUpdate({userID}, {$inc: {[field]: 1}}).then(result => {
                   if (result) {
                       completeSubmit();
                   } else {
                    let newNotiy = new viewnotify({
                        userID,
                        post: 1
                    });
                    newNotify.save().then(() => {
                        completeSubmit();
                    }).catch(err => {
                        reject(err)
                    })
                   }
                }).catch(err => {
                    reject(err)
                })
               function completeSubmit() {
                userModel.findByIdAndUpdate(userID, {$addToSet: { [userField]: { $each: categ } }}).then(result => {
                    if (result.enableNotification) {
                        let allSubscription = [];
                        user.find({_id: { $in : shareMe }}).then(users => {
                            let fndUsers = users ? users : []
                            allSubscription.push(...fndUsers);
                            authUser.find({_id: { $in : shareMe }}).then(authUsers => {
                                let fndAuthUser = authUsers ? authUsers : [];
                                allSubscription.push(...fndAuthUser);
                                let send = 0;
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
                                            openUrl: `/${field}/${id}`
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
            }).catch(err => {
                reject(err)
            })
        }

        category.countDocuments({}).then((result) => {
            if ( result < 1) { 
                let newCateg = new category({
                   [field]: categ
                });
                newCateg.save().then(() => {
                    if (shareMe.length > 0) {
                       notification();
                    } else {
                        resolve(id)
                    }
                }).catch(err => {
                    reject(err)
                });
                return 
            }
            category.findOneAndUpdate({}, {$addToSet: { [field]: { $each: categ } }}).then(() => {
                if (shareMe.length > 0) {
                    notification();
                } else {
                    model.findByIdAndUpdate(id, {_isCompleted: true}).then(() => {
                        resolve(id)
                    })
                }
            }).catch(err => {
                reject(err)
            })
        })
    }).catch(err => {
        reject(err)
    })
   })
}