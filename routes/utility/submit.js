let notifications = require('./notifications');

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
                userModel.findByIdAndUpdate(userID, {$addToSet: { [userField]: { $each: categ } }}).then(() => {
                    model.findByIdAndUpdate(id, {_isCompleted: true}).then(() => {
                        resolve(id)
                    })
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