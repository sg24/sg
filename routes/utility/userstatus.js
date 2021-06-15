const { user } = require('../../serverDB/serverDB');

module.exports = userStatus = (cnt = [], userID, userNotification = []) => {
    return new Promise ((resolve, reject) => {
        let getStatus = 0;
        let updateFriend = [];
        for (let cntItem of cnt) {
            user.findById(cntItem.authorID).then(doc => {
                if (doc) {
                    ++getStatus;
                    let chatInfo = doc.chat.filter(info => JSON.parse(JSON.stringify(info.authorID)) === JSON.parse(JSON.stringify(userID)))[0];
                    let message = chatInfo ? chatInfo.content ? chatInfo.content : 
                        chatInfo.media && chatInfo.media.length > 0 ? chatInfo.media[chatInfo.media.length -1].filename.split('.')[0] + '.' + chatInfo.media[chatInfo.media.length -1].ext.split('/')[1] : null : null;
                    let chatNotification = userNotification ? userNotification.userChat : [];
                    let notification = chatNotification.filter(userChat => userChat.userID === JSON.parse(JSON.stringify(doc._id)))[0];
                    let updateNotification = notification ? notification.counter : 0;
                    let isOnline = (new Date().getTime() - new Date(doc.visited).getTime()) < 60000;
                    updateFriend.push({_id: doc._id, chat: chatInfo ? chatInfo._id : null, username: doc.username,
                        userImage: doc.image, status: isOnline, message, notification: updateNotification, created: chatInfo ? chatInfo.created : null})
                    if (getStatus === cnt.length) {
                        return resolve(updateFriend);
                    }
                }
            }).catch(err => {
                reject(err)
            })
        }
    })
}