const express = require('express');
const router = express.Router();
const { connectStatus, qchat, qcontent } = require('../serverDB/serverDB');
const authenticate = require('../serverDB/middleware/authenticate');

router.get('/:id', authenticate, (req, res, next) => {
    if (!req.params.id) {
        res.redirect('/qchat')
        return
    }
    res.render('examtab');
})

router.post('/',authenticate, (req, res,next) => {
    if (req.header !== null && req.header('data-categ') === 'examcnt') {
        let contentID = req.body.contentID;
        qchat.findOneAndUpdate({contentID}, {$inc: {'write': 1}}).then(result => {
            if (!result) {
                return res.sendStatus(404)
            }
            let cnt = {
                duration: result.duration, id: result._id, title: result.title
            }
            qcontent.findOne({qchatID: contentID}).then(que => {
                if (!que) {
                    return res.sendStatus(404)
                }
                cnt['question'] = que.question;
                return res.send(cnt).status(200)
            })
        }).catch(err => {
            res.sendStatus(404)
        })
        return 
    }
   
});

module.exports = router
