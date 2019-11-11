module.exports =  notification = (shareMe, model) => {
            return new Promise((resolve, reject) =>{
                let i = 0;
                for (let userID of shareMe) {
                    model.findOne({userID}).then(result => {
                        if (result !== null) {
                            model.findOneAndUpdate({userID}, {$inc: {'notifications': 1}}).then(result =>{
                                if(++i === shareMe.length) {
                                   resolve()
                                }
                            }).catch(err =>{
                                reject(err)
                            })
                        } else {
                            let newNotify = new model({
                                userID,
                                notifications: 1
                            });
                            newNotify.save().then(() => {
                                if(++i === shareMe.length) {
                                    resolve()
                                }
                            }).catch(err =>{
                                reject(err)
                            })
                        } 
                        
                    }).catch(err => {
                        reject(err)
                    })
                }
            })
        }