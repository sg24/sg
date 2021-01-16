let notifications = require('./notifications');
const webpush = require('web-push');
const { user, authUser, tempFile} = require('../../serverDB/serverDB');

module.exports = submitForm = (model, cnt, tempFileID, field) => {
    return new Promise ((resolve, reject) => {
        let newDoc = new model({
            ...cnt
        }); 
        newDoc.save().then(doc => {
            let id = doc._id;
            resolve(id);
            Promise.all([tempFile.findOneAndUpdate({userID: cnt.userID, "tempFiles.id": tempFileID}, {$pull: {tempFiles: {id: tempFileID}}}),
            doc.updateOne({_isCompleted: true})]).then(() =>  {
                user.findById(cnt.authorID).then(userInfo => {
                    if (userInfo && userInfo.friend && userInfo.friend.length > 0) {
                        for (let recieverID of userInfo.friend) {
                            notifications(field, recieverID, {userID: cnt.authorID, ID: id}, false);
                        }
                    }
                })
            }).catch(err => {console.log(err)})
        }).catch(err => {
            reject(err)
        })
    })
}
