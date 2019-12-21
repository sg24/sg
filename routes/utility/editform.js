let notifications = require('./notifications');
const webpush = require('web-push');
const { user, authUser, mediachunks, mediafiles} = require('../../serverDB/serverDB');
let mongoose = require('mongoose');

module.exports = editForm = (content, model, files, notify, userModel, userID, updateField, userField, field, res, category) => {
   return new Promise ((resolve, reject) => {
    let categRaw = String(content.categ).split(',');
    let categ = [...new Set(categRaw)];
    let shareMe = content.shareMe !== '' ? String(content.shareMe).split(',') : [];
    let id = null;
    let fileID = [];

    for( let file of files) {
        fileID.push({id: file.id, type: file.contentType, snapshotID: file.filename});
    }

    let updates = {
        category: categ,
        video: fileID,
        image: content.image,
        shareMe,
        title: content.title,
        desc: content.desc,
        mode: content.mode,
        edit: Date.now(),
        snapshot: content.snapshot !== undefined ? JSON.parse(content.snapshot) : []
    }; 

    model.findOneAndUpdate({_id: content.id, authorID: userID}, updates).then(result => {
        id = result._id;
        let oldFileID = []
        for (let video of result.video) {
            oldFileID.push(video.id);
        }
        mediachunks.find({files_id: {$in : oldFileID}}).then(result => {
            console.log(result)
            category.findOneAndUpdate({}, {$addToSet: { [field]: { $each: categ } }}).then(() => {
                notification();
            }).catch(err => {
                reject(err)
            })
        });
        function notification() {
            notifications(shareMe, notify, id, updateField).then(() => {
                completeSubmit();
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
    }).catch(err => {
        reject(err)
    })
   })
}