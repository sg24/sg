const { tempFile } = require('../../serverDB/serverDB');

module.exports = editForm = (model, cnt, tempFileID, updateID, field) => {
    return new Promise ((resolve, reject) => {
        model.findOneAndUpdate({_id: updateID, authorID: cnt.authorID}, cnt).then(doc => {
            if (doc) {
                let id = doc._id;
                resolve(id);
                Promise.all([tempFile.findOneAndUpdate({userID: cnt.authorID, "tempFiles.id": tempFileID}, {$pull: {tempFiles: {id: tempFileID}}}),
                    doc.updateOne({tempFileID: null})])
            } else {
                reject('Not Found');
            }
        }).catch(err => {
            reject(err)
        })
    })
}
