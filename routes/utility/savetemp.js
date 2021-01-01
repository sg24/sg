const {connectStatus, tempFile} = require('../../serverDB/serverDB');
const fs = require('fs');

let saveTemp = (allFiles, userID) => {
    return new Promise((resolve, reject) => {
        let files = []
        if ((!allFiles) || (allFiles.length < 1)) {
            resolve();
            return;
        }

        if (allFiles.length === undefined) {
            allFiles = [allFiles]
        }

        for (let file of [...allFiles]){
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