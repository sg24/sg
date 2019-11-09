const postnotifies = require('../../serverDB/serverDB').postnotifies;

module.exports =  notification = (shareMe) => {
            return new Promise((resolve, reject) =>{
                let i = 0;
                for (let userID of shareMe) {
                    postnotifies.findOne({userID}).then(result => {
                        if (result !== null) {
                            postnotifies.findOneAndUpdate({userID}, {$inc: {'notifications': 1}}).then(result =>{
                                if(++i === shareMe.length) {
                                   resolve()
                                }
                            })
                        } else {
                            let newPostnotify = new postnotifies({
                                userID,
                                notifications: 1
                            });
                            newPostnotify.save().then(() => {
                                if(++i === shareMe.length) {
                                    resolve()
                                }
                            })
                        } 
                        
                    }).catch(err => {
                        reject(err)
                    })
                }
            })
        }