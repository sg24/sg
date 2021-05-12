const { notifications } = require('../../serverDB/serverDB')

const userNotifications = (field , recieverID, cnt, isRemove) => {
    return new Promise((resolve, reject) =>{
        notifications.findOne({userID: recieverID}).then(doc => {
            let cntID = cnt.ID ? {cntID: [cnt.ID]} : {};
            let counter = cnt.enableCounter ? {counter: 1} : {};
            if (doc) {
                let cntField = doc[field];
                let checkUser = cntField.filter(cntFnd =>  cntFnd.userID === cnt.userID)[0];
                let checkUserIndex = cntField.findIndex(cntFnd => cntFnd.userID === cnt.userID)[0];
                if (checkUser) {
                    if(checkUser.cntID) {
                        checkUser.cntID.push(cnt.ID);
                        checkUser.cntID = [...new Set(checkUser.cntID)]
                        if (cnt.enableCounter) {
                            ++checkUser.counter;
                        }
                        if (isRemove) {
                            let updateCntID = checkUser.cntID.filter(id => id !== cnt.ID);
                            checkUser.cntID = updateCntID;
                            if (cnt.enableCounter) {
                                --checkUser.counter;
                            }
                        }
                        cntField[checkUserIndex] = checkUser;
                    } 
                    cntField = (!checkUser.cntID || (checkUser.cntID.length < 1)) && isRemove ? cntField.filter(cntFnd =>  cntFnd.userID !== cnt.userID) : cntField;
                } else if (!isRemove) {
                    cntField.push({userID: cnt.userID, ...cntID, ...counter})
                }
                doc.updateOne({[field]: cntField}).then(() => {
                    resolve();
                })
                return
            } else if (!isRemove){
                let notification = new notifications({
                    userID: recieverID,
                    [field]: [{userID: cnt.userID, ...cntID, ...counter}]
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