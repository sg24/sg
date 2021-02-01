const {connectStatus, tempFile} = require('../../serverDB/serverDB');
const fs = require('fs');
const uuid = require('uuid/v4');

let saveTemp = (allFiles, page, userID) => {
    return new Promise((resolve, reject) => {
        let files = [];
        let id = uuid();
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
            tempFile.findOne({userID}).then(res => {
                if (res) {
                    let allErrFiles = []
                    for (let file of res.tempFiles) {
                        if (!file.check && ((new Date(file.uploadDate).getTime() + 1000 * 60 * 60 * 6) <= new Date().getTime())) {
                            let errFiles = [];
                            for (let tmpPath of file.files) {
                                (async () => {
                                    try {
                                        await fs.unlinkSync(tmpPath);
                                    } catch (e) {
                                        errFiles.push(tmpPath);
                                    }
                                })()
                            }
                            if ( errFiles.length > 0) {
                                allErrFiles.push({files: errFiles, check: true, id: file.id, page: file.page})
                            }
                        } else {
                            allErrFiles.push({files: file.files, check: file.check, id: file.id, page: file.page})
                        }
                    }
                    let allTempFile = allErrFiles ? [...allErrFiles, {files,  id, page}] : {files, id, page}
                    res.updateOne({tempFiles: allTempFile}).then(() => {
                        resolve(id)
                    })
                } else {
                    let temp = new tempFile({
                        userID,
                        tempFiles: {files, id, page}
                    })
                    temp.save().then(res => {
                        resolve(id)
                    })
                }
            })
        }).catch(err => {
           reject(err)
        })
    })
}

module.exports = saveTemp