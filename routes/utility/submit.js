const {category, postnotifies} = require('../../serverDB/serverDB');

module.exports = submitForm = (content, model, files, field) => {
    console.log(content, model, files, field)
    let categRaw = String(content.categ).split(',');
    let categ = [...new Set(categRaw)];
    let shareMe = content.shareMe !== '' ? String(content.shareMe).split(',') : [];
    let id = null;
    let fileID = [];

    for( let file of files) {
        fileID.push({id: file.id, type: file.contentType, snapshotID: file.filename});
    }
    let createModel;
    
    if (content.title) {
        createModel = {
            authorID: Date.now(),
            category: categ,
            postVideo: fileID,
            postImage: content.image,
            shareMe,
            title: content.title,
            desc: content.desc,
            mode: content.mode,
            snapshot: content.snapshot !== undefined ? JSON.parse(content.snapshot) : []
        }
    } else {
        createModel = {
            authorID: Date.now(),
            category: categ,
            video: fileID,
            image: content.image,
            shareMe,
            desc: content.desc,
            mode: content.mode,
            snapshot: content.snapshot !== undefined ? JSON.parse(content.snapshot) : []
        }
    }
    
    let newCnt = new model(createModel); 

    newCnt.save().then(result => {
        id = result._id;
        
        function notification() {
            notifications(shareMe).then(() =>{
                model.findByIdAndUpdate(id, {_isCompleted: true}).then(() => {
                    res.status(201).send(id);
                }).catch(err => {
                    res.status(500).send(err);
                })
            }).catch(err => {
                res.status(500).send(err)
            })
        }

        category.countDocuments({}).then((result) => {
            if ( result < 1) { 
                console.log({[field]: { $each: categ }})
                let newCateg = new category({
                    [field]: categ
                });
                newCateg.save().then(() => {
                    if (shareMe.length > 0) {
                       notification();
                    } else {
                        res.status(201).send(id);
                    }
                }).catch(err => {
                    res.status(500).send(err);
                });
                return 
            }
            category.findOneAndUpdate({}, {$addToSet: { [field]: { $each: categ } }}).then(() => {
                if (shareMe.length > 0) {
                    notification();
                } else {
                    res.status(201).send(id);
                }
            }).catch(err => {
                res.status(500).send(err);
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
}