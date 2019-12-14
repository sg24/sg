module.exports =  notification = (shareMe, model, id, field) => {
            return new Promise((resolve, reject) =>{
                let i = 0;
                
                if (shareMe.length < 1) {
                    resolve()
                    return
                }

                for (let userID of shareMe) {
                    model.findOne({userID}).then(result => {
                        if (result !== null) {
                            model.findOneAndUpdate({userID, [field]: { $ne : id }}, {$inc: {'notifications': 1}, $addToSet: { [field]: id }}).then(result =>{
                                if(++i === shareMe.length) {
                                   resolve()
                                }
                            }).catch(err =>{
                                reject(err)
                            })
                        } else {
                            let newNotify = new model({
                                userID,
                                notifications: 1,
                                [field]:  id 
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