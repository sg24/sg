module.exports = fetchCnt = (connectStatus, conditions, sort, curLimit, skip, meta, model) => {
    return new Promise((resolve, reject) => {
        let condition = {...conditions}
        connectStatus.then(() => {
        model.find(condition, meta).countDocuments({}).then((cntTotal) => {
            model.find(condition, meta).sort(sort).limit(curLimit).skip(skip).then(result => {
                    resolve({cntTotal, cnt: result})
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