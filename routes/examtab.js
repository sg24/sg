const express = require('express');
const router = express.Router();
const { connectStatus, qchat, qcontent } = require('../serverDB/serverDB');
const authenticate = require('../serverDB/middleware/authenticate');

router.get('/:id', authenticate, (req, res, next) => {
    if (!req.params.id) {
        res.redirect('/qchat')
        return
    }
     if (!req.authType) {
       res.render('examtab');
    } else {
        res.cookie('redirect', '/qchat');
        res.redirect('/login')
    }
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
                let queArray =[];
                // function shuffle(a) {
                //     var j, x, i;
                //     for (i = a.length - 1; i > 0; i--) {
                //         j = Math.floor(Math.random() * (i + 1));
                //         x = a[i];
                //         a[i] = a[j];
                //         a[j] = x;
                //     }
                //     return a;
                // }
                function shuffle(a) {
                    for (let i = a.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [a[i], a[j]] = [a[j], a[i]];
                    }
                    return a;
                }
                queArray = shuffle(que.question)
                cnt['question'] = queArray;
                return res.send(cnt).status(200)
            })
        }).catch(err => {
            res.sendStatus(404)
        })
        return 
    }
   
});

module.exports = router
