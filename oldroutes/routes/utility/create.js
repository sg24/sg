const webpush = require('web-push');
const { user, authUser} = require('../../serverDB/serverDB');

module.exports = create = (content, model, mediaCnt,  userModel, userID, field, modelField, res, category) => {
   return new Promise ((resolve, reject) => {
    let categRaw = String(content.categ).split(',');
    let categ = [...new Set(categRaw)];
    let id = null;
    let fileID = [];

    let newDoc = new model({
        authorID: userID,
        category: categ,
        image: mediaCnt.image,
        title: content.title,
        desc: content.desc,
    }); 

    newDoc.save().then(result => {
        id = result._id;

        function completeSubmit() {
            userModel.findByIdAndUpdate(userID, {$inc: {[modelField]: 1}}).then(result => {
                model.findByIdAndUpdate(id, {_isCompleted: true}).then(() => {
                    resolve(id)
                })
            }).catch(err => {
                reject(err)
            })
        }

        category.countDocuments({}).then((result) => {
            if ( result < 1) { 
                let newCateg = new category({
                   [field]: categ
                });
                newCateg.save().then(() => {
                    completeSubmit();
                }).catch(err => {
                    reject(err)
                });
                return 
            }
            category.findOneAndUpdate({}, {$addToSet: { [field]: { $each: categ } }}).then(() => {
                completeSubmit();
            }).catch(err => {
                reject(err)
            })
        })
    }).catch(err => {
        reject(err)
    })
   })
}