const {connectStatus, tempFile} = require('../../serverDB/serverDB');
const fs = require('fs');

let saveTemp = (allFiles, image, userID) => {
    return new Promise((resolve, reject) => {
        let files = []
        if ((!allFiles && !image) || (allFiles.length < 1 && image.length < 1)) {
            resolve();
            return;
        }

        if (allFiles.length === undefined) {
            allFiles = [allFiles]
        }
        if (image.length === undefined) {
            image = [image]
        }
        for (let file of [...allFiles, ...image]){
            files.push(file.path);
        }

        connectStatus.then(() => {
            let temp = new tempFile({
                userID,
                files
            })
            temp.save().then(res => {
                resolve(res.id)
            })
        }).catch(err => {
           reject(err)
        })
    })
}

module.exports = saveTemp