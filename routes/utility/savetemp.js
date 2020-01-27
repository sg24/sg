const {connectStatus, tempFile} = require('../../serverDB/serverDB');
const fs = require('fs');

let saveTemp = (allFiles, userID) => {
    return new Promise((resolve, reject) => {
        let files = []
        if (allFiles.length < 1) {
            resolve();
            return;
        }
        for (let file of allFiles){
            files.push(file.filename);
        }
        connectStatus.then(() => {
            let temp = new tempFile({
                userID,
                files
            })
            temp.save().then((res) => {
                resolve(res)
            })
        }).catch(err => {
           reject(err)
        })
    })
}

module.exports = saveTemp