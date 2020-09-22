const { notifications } = require('../../serverDB/serverDB')

const userNotifications = (field , recieverID, cnt, isRemove) => {
    return new Promise((resolve, reject) =>{
        notifications.findOne({userID: recieverID}).then(doc => {
            let cntID = cnt.cntID ? {cntID: [cnt.ID]} : {}
            if (doc) {
                let cntField = doc[field];
                let checkUser = cntField.filter(cntFnd =>  cntFnd.userID === cnt.userID)[0];
                let checkUserIndex = cntField.findIndex(cntFnd => cntFnd.userID === cnt.userID)[0];
                if (checkUser) {
                    if(checkUser.cntID) {
                        checkUser.cntID.push(cnt.ID);
                        checkUser = new Set(...checkUser)
                        if (isRemove) {
                            checkUser = checkUser.cntID.filter(id =>  id !== cnt.ID)
                        }
                        cntField[checkUserIndex] = checkUser;
                    } 
                    cntField = !checkUser.cntID ? cntField.filter(cntFnd =>  cntFnd.userID !== cnt.userID) : cntField;
                } else if (!isRemove) {
                    cntField.push({userID: cnt.userID, ...cntID})
                }
                doc[field] = cntField;
                doc.save().then(() => {
                    resolve();
                })
                return
            } else if (!isRemove){
                let notification = new notifications({
                    userID: recieverID,
                    [field]: [{userID: cnt.userID, ...cntID}]
                })
                notification.save().then(() => {
                    resolve()
                }).catch((err) => {
                    reject(err)
                })
            } else {
                resolve()
            }
            
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = userNotifications