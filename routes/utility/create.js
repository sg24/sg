const webpush = require('web-push');
const { user, authUser, tempFile} = require('../../serverDB/serverDB');

module.exports = create = (content, model, mediaCnt, notify, userModel, userID, field, modelField, res, category, tempFileID) => {
   return new Promise ((resolve, reject) => {
    let categRaw = String(content.categ).split(',');
    let categ = [...new Set(categRaw)];
    let shareMe = content.shareMe !== '' ? String(content.shareMe).split(',') : [];
    let id = null;
    let fileID = [];

    let newDoc = new model({
        authorID: userID,
        category: categ,
        image: mediaCnt.image,
        title: content.title,
        desc: content.desc,
    }); 

    newDoc.save().then(result => {
        id = result._id.toHexString();

        function completeSubmit() {
            userModel.findByIdAndUpdate(userID, {$inc: {[modelField]: 1}}).then(result => {
                tempFile.findByIdAndRemove(tempFileID).then(() => {
                    notification(shareMe, notify, id).then(() => {
                        pushNotify(userID, id, shareMe, model).then(id =>{
                            resolve(id)
                        })
                    })
                })
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
                    completeSubmit();
                }).catch(err => {
                    reject(err)
                });
                return 
            }
            category.findOneAndUpdate({}, {$addToSet: { [field]: { $each: categ } }}).then(() => {
                completeSubmit();
            }).catch(err => {
                reject(err)
            })
        })

                
        function pushNotify(userID, id, shareMe, model) {
            return new Promise((resolve, reject) => {
                userModel.findById(userID).then(result => {
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
                                        let isImage = content.image && content.image.length > 0 ? {image:  content.image[0]} : {}; 
                                        webpush.sendNotification(pushConfig, JSON.stringify({
                                            title: String(content.title).length < 50 ?  String(content.title) : String(content.title).substr(0, 50) + '...',
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
                            let grpNotify = result.group.filter(grpDet => grpDet.ID !== id)
                            if (grpNotify.length > 0) {
                                grpsNotify.push(...result.group, {ID: id})
                                model.findOneAndUpdate({userID}, {$inc: {'notifications': 1}, [field]: grpsNotify }).then(result =>{
                                    if(++i === shareMe.length) {
                                    resolve()
                                    }
                                }).catch(err =>{
                                    reject(err)
                                })
                            } else {
                                resolve()
                            }
                        } else {
                            let newNotify = new model({
                                userID,
                                notifications: 1,
                                [field]:  [{ID: id}] 
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
    }).catch(err => {
        reject(err)
    })
   })
}
