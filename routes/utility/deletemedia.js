const { authUser , user} = require('../serverDB');
const checkStatus = require('../utility/status');
const {posts, questions, poets, viewnotifies, pwtnotifies, connectStatus, user, authUser} = require('../serverDB/serverDB');

let deleteMedia = (req, res, next) => {
    const content = req.body;
    connectStatus.then(() => {
        let model = content.modelType === 'post' ? posts : content.modelType === 'question' ? questions : poets; 
        model.findOne({uniqueID: content.uniqueID}).then(result  => {
            if (result.length < 1) {
                next();
                return
            }
            let oldFileID = []
            for (let video of result.video) {
                oldFileID.push(video.id);
            }
            mongoose.mongo.db('media.chunks').find({files_id: {$in : oldFileID}}).then(result => {
                console.log(result)
                next()
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
}


module.exports = deleteMedia;