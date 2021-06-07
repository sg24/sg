let notifications = require('./notifications');
const webpush = require('web-push');
const { user, tempFile} = require('../../serverDB/serverDB');

module.exports = submitForm = (model, cnt, tempFileID, field, enabled=true, notificationReciever) => {
    return new Promise ((resolve, reject) => {
        let newDoc = new model({
            ...cnt
        }); 
        newDoc.save().then(doc => {
            let id = doc._id;
            resolve(id);
            Promise.all([tempFile.findOneAndUpdate({userID: cnt.authorID, "tempFiles.id": tempFileID}, {$pull: {tempFiles: {id: tempFileID}}}),
            doc.updateOne({_isCompleted: true, tempFileID: null})]).then(() =>  {
                if (enabled) {
                    if (!notificationReciever) {
                        user.findById(cnt.authorID).then(userInfo => {
                            if (userInfo && userInfo.friend && userInfo.friend.length > 0 && field) {
                                for (let recieverID of userInfo.friend) {
                                    notifications(field, recieverID, {userID: cnt.authorID, ID: id}, false);
                                }
                            }
                        })
                    } else {
                        for (let recieverID  of notificationReciever) {
                            notifications(field, recieverID, {userID: cnt.authorID, ID: id}, false);
                        }
                    }
                }
            }).catch(err => {console.log(err)})
        }).catch(err => {
            reject(err)
        })
    })
}
