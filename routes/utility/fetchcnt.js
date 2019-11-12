module.exports = fetchCnt = (connectStatus, conditions, sort, curLimit, skip, meta, model) => {
    return new Promise((resolve, reject) => {
        let condition = {mode: 'publish', _isCompleted: true, ...conditions}
        connectStatus.then(() => {
            model.find(condition, meta).countDocuments({}).then((cntTotal) => {
                model.find(condition, meta).sort(sort).limit(parseInt(curLimit)).skip(parseInt(skip)).then(result => {
                    let cntArray= [];
                    for (let cnt of result) {
                        let desc = JSON.parse(cnt.desc).blocks[0].text;
                        cnt.desc = desc;
                        cntArray.push(cnt);
                    }
                    resolve({cnt: cntArray, cntTotal})
                }).catch(err => {
                   reject(err)
                })
            }).catch(err => {
                reject(err)
            }) 
        }).catch(err => {
            reject(err)
        })
    })
}