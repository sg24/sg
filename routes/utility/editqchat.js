let notifications = require('./notifications');
const webpush = require('web-push');
const { user, authUser, qcontent, category, tempFile} = require('../../serverDB/serverDB');
const deleteMedia = require('./deletemedia');

module.exports = submitForm = (qchat, removedMedia, model, mediaCnt, userModel, userID, tempFileID) => {
   return new Promise ((resolve, reject) => {
    let content = qchat.filter(cnt => cnt.position === 0)[0];
    let categRaw = String(content.categ).split(',');
    let categ = [...new Set(categRaw)];
    let id = null;
    let shareMe = [];
    let media = mediaCnt.filter(cnt => cnt.position === '0')[0];
    let question = qchat.filter(cnt => cnt.position !== 0);
    let updates = {
        username: userID.username, 
        userImage: userID.userImage,
        category: categ,
        video: media ? media.video: [],
        image: media ? media.image: [],
        title: content.title,
        mode: content.mode === 'next' || content.mode === 'publish' ? 'publish' : content.mode,
        access: content.participant,
        duration: content.duration,
        qchatTotal: question.length,
        hour: content.hour ? Number.parseInt(content.hour) : 0,
        minute: content.minute ? Number.parseInt(content.minute) : 0,
        second: content.second ? Number.parseInt(content.second) : 0,
        edit: Date.now(),
        snapshot: media ? media.snapshot: []
    }; 

    model.findOneAndUpdate({_id: content.id, authorID: userID.authorID}, updates).then(result => {
        id = result._id;
        
        for (let queFnd of question) {
            let mediaFnd = mediaCnt.filter(itm => itm.position === String(queFnd.position))[0];
            if (mediaFnd) {
                queFnd.image = mediaFnd.image;
                queFnd.video = mediaFnd.video,
                queFnd.snapshot = mediaFnd.snapshot
                question = question.filter(que => que.position !== queFnd.position);
                question.push(queFnd)
            }
        }

        qcontent.findOneAndUpdate({qchatID: result.contentID}, {question}).then(() => {
            removeMedia(removedMedia).then(() => {
                category.findOneAndUpdate({}, {$addToSet: { 'qchat' : { $each: categ } }}).then(() => {
                    tempFile.findByIdAndRemove(tempFileID).then(() => {
                        completeSubmit();
                    })
                })
            });
        })
        function removeMedia(removedMedia) {
            return new Promise((resolve,reject) => {
                if (removedMedia.length > 0) {
                    let deleted = 0;
                    for (let media of removedMedia) {
                        if ( media.mediaType === 'snapshot' ){
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

        function completeSubmit() {
            userModel.findByIdAndUpdate(userID.authorID, { $inc: {'qchat': 1}}).then(result => {
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
                                        title: String(content.title).length < 50 ? String(content.title) : String(content.title).substr(0, 50)+'...',
                                        openUrl: `/view/qchat/${id}`
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
   })
}