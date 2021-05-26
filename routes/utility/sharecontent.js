const { share } = require('../../serverDB/serverDB');

module.exports = sharecontent = (reciepent, field, ID, title, imageMedia, cntID) => {
    return new Promise ((resolve, reject) => {
        for (let userID of reciepent) {
            share.findOne({userID}).then(doc => {
                if (doc) {
                    let cntItem = doc[field].filter(cnt => JSON.parse(JSON.stringify(cnt.cntID)) === JSON.parse(JSON.stringify(cntID)))[0];
                    if (!cntItem) {
                        doc[field].push({ID, title, image: imageMedia, cntID});
                        doc.updateOne({[field]: doc[field]}).then(() => {
                            resolve();
                        })
                    } else {
                        resolve();
                    }
                } else {
                    let newDoc = new share({
                        userID,
                        [field]: [{ID, title, image: imageMedia, cntID}]
                    });
                    newDoc.save().then(() => {
                        resolve()
                    }).catch((err) => {
                        reject(err)
                    })
                }
            })
        }
    })
}