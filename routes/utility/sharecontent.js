module.exports = sharecontent = (model, receiverModel, cntID, reciepent, authorID, username, userImage, pageID, pageTitle, updateField={}) => {
    return new Promise ((resolve, reject) => {
        model.findById(cntID).then(doc => {
            if (doc) {
                let updateDoc = JSON.parse(JSON.stringify(doc));
                delete updateDoc.block;
                delete updateDoc.favorite;
                delete updateDoc.shareInfo;
                delete updateDoc.share;
                delete updateDoc.chat;
                delete updateDoc.report;
                delete updateDoc._v;
                delete updateDoc._id;
                delete updateDoc.groupID;
                let updateMedia = [];
                for (let cnt of updateDoc.media) {
                    delete cnt.chat;
                    updateMedia.push(cnt);
                }
                updateDoc.media = updateMedia;
                let shareInfo = {
                    authorID,
                    username,
                    userImage,
                    pageID,
                    pageTitle,
                    cntID
                };
                updateDoc.shareInfo = shareInfo;
                let shared = 0;
                let pageInfo = [];
                for (let userID of reciepent) {
                    let newDoc = new receiverModel({
                        ...updateDoc,
                        allowed: [userID],
                        groupID: userID
                    }); 
                    newDoc.save().then(doc => {
                        pageInfo.push({userID, pageID: doc.id})
                        ++shared;
                        if (shared === reciepent.length) {
                            resolve(pageInfo)
                        }
                    });
                }
            }
        }).catch(err => {
            reject(err)
        })
    })
}