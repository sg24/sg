let notifications = require('./notifications');
const webpush = require('web-push');
const { user, authUser, tempFile} = require('../../serverDB/serverDB');
const deleteMedia = require('./deletemedia');

module.exports = editForm = (content, model, mediaCnt, notify, userModel, userID, field, res, category, tempFileID) => {
   return new Promise ((resolve, reject) => {
    let categRaw = String(content.categ).split(',');
    let categ = [...new Set(categRaw)];
    let shareMe = content.shareMe !== '' ? String(content.shareMe).split(',') : [];
    let id = null;
    let removedMedia = content.removedmedia ? JSON.parse(content.removedmedia) : [];

    let updates = {
        category: categ,
        title: content.title,
        desc: content.desc,
        image: mediaCnt.image,
        _isCompleted: false
    }; 

    model.findOneAndUpdate({_id: content.id, authorID: userID}, updates).then(result => {
        id = result._id.toHexString();
        
        removeMedia(removedMedia).then(() => {
            category.findOneAndUpdate({}, {$addToSet: { [field]: { $each: categ } }}).then(() => {
                tempFile.findByIdAndRemove(tempFileID).then(() => {
                    notification([...result.member, ...shareMe], notify, id).then(()=> {
                        completeSubmit(userID, id, result.member).then(id => {
                            resolve(id);
                        })
                    });
                })
            })
        });

        
        function removeMedia(removedMedia) {
            return new Promise((resolve,reject) => {
                if (removedMedia.length > 0) {
                    let deleted = 0;
                    for (let media of removedMedia) {
                        if (media.mediaType === 'snapvideo' || media.mediaType === 'snapshot' ){
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

        function notification(shareMe, model, id) {
            return new Promise((resolve, reject) =>{
                let i = 0;
                
                if (shareMe.length < 1) {
                    resolve()
                    return
                }

                for (let userID of shareMe) {
                    model.findOne({userID}).then(result => {
                        if (result && result.group && result.group.length > 0) {
                            let grpsNotify = [];
                            let grpNotify = result.group.filter(grpDet => grpDet.ID === id)
                            if (grpNotify.length > 0) {
                                if (grpNotify[0].isMember){
                                    grpNotiy[0].edit = true;
                                    grpNotiy[0].view = false;
                                    grpsNotify = result.group.filter(grpDet => grpDet.ID !== id)
                                    grpsNotify.push(grpNotify[0])
                                } else {
                                    grpsNotify.push(result.group);
                                }
                            } else {
                                grpsNotify.push(...result.group, {ID: id, view: false})
                            }
                            model.findOneAndUpdate({userID}, {$inc: {'notifications': 1}, [field]: grpsNotify }).then(result =>{
                                if(++i === shareMe.length) {
                                   resolve()
                                }
                            }).catch(err =>{
                                reject(err)
                            })
                        } else {
                            let newNotify = new model({
                                userID,
                                notifications: 1,
                                [field]:  [{ID: id, view: false}] 
                            });
                            newNotify.save().then(() => {
                                if(++i === shareMe.length) {
                                    resolve()
                                }
                            }).catch(err =>{
                                reject(err)
                            })
                        } 
                        
                    }).catch(err => {
                        reject(err)
                    })
                }
            })
        }

        function completeSubmit(userID, id, member) {
            return new Promise((resolve, reject) => {
                userModel.findById(userID).then(result => {
                    if (result.enableNotification) {
                        let allSubscription = [];
                        user.find({_id: { $in : member }}).then(users => {
                            let fndUsers = users ? users : []
                            allSubscription.push(...fndUsers);
                            authUser.find({_id: { $in : member }}).then(authUsers => {
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
                                            title: 'Group Name Updated to ' + String(content.title).length < 50 ?  String(content.title) : String(content.title).substr(0, 50) + '...',
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
            })
        }
    }).catch(err => {
        reject(err)
    })
   })
}