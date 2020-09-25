const { user, tempFile} = require('../../serverDB/serverDB');
const notifications = require('./notifications');
const webpush = require('./webpush');

module.exports = create = (content, model, mediaCnt, userID, field, subUrl, notificationField, tempFileID) => {
   return new Promise ((resolve, reject) => {
    let id = null;
    let group = content.group !== '' ? String(content.group).split(',') : [];
    let invite = content.invite !== '' ? String(content.invite).split(',') : [];
    
    let newDoc = new model({
        authorID: userID,
        image: mediaCnt.image,
        title: content.title,
        desc: content.desc,
        group,
        groupMode: content.groupmode
    });

    newDoc.save().then(result => {
        id = result._id.toHexString();
        tempFile.findByIdAndRemove(tempFileID).then(() => {
            result._isCompleted = true;
            result.save().then(() => {
                user.findByIdAndUpdate(userID, {$addToSet: {[field]: id}}).then(user => {
                    resolve(id)
                    return Promise.resolve()
                })
            }).catch(err => {
                reject(err)
            }).then(() => {
                if (invite && invite.length > 0) {
                    for (let userInvited of invite) {
                        Promise.all([
                            notifications(notificationField, userInvited, {userID, ID: id}, false),
                            webpush(userID, `${String(field).charAt(0).toUpperCase()+String(field).slice(1)} Invitation`, `${user.username} invited you to this ${content.title}`, 
                            content.image.length > 0 ? `https://www.slodge24.com/media/image/${content.image[0].id}` : null,
                            `https://www.slodge24.com${subUrl}/${id}`)
                        ])
                    }
                }
                // if (group && group.length > 0) {
                //     for (let memberID of user.page) {
                //         Promise.all([
                //             notifications('pageGroupAdded', memberID, {userID}, false),
                //             webpush(userID, 'New Group Added to page', `${user.username} have added new group to ${content.title}`,
                //             `https://www.slodge24.com/media/image/${content.image[0].id}`,
                //             `https://www.slodge24.com/${subUrl}/${id}`)
                //         ])
                //     }
                // }
            }).catch(err => err)
        })
    }).catch(err => {
        reject(err)
    })
   })
}
