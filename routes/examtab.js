const express = require('express');
const router = express.Router();
let objectID = require('mongoose').mongo.ObjectId;

const { connectStatus, qchat, qcontent, cbtchat } = require('../serverDB/serverDB');
const authenticate = require('../serverDB/middleware/authenticate');

router.post('/',authenticate, (req, res,next) => {
    if (req.header !== null && req.header('data-categ') === 'getExam') {
        let pageID = req.body.searchCnt;
        qchat.findOne({$or: [{_id: pageID, 'allowedUser.authorID': {$eq: req.user}}, {_id: pageID, participant: {$eq: 'Public'}}]}).then(doc => {
            if (doc) {
                qcontent.findById(doc.question).then(result => {
                    if (result) {
                        function shuffle(a) {
                            for (let i = a.length - 1; i > 0; i--) {
                                const j = Math.floor(Math.random() * (i + 1));
                                [a[i], a[j]] = [a[j], a[i]];
                            }
                            return a;
                        }
                        let question = shuffle(result.question);
                        let updateQuestion = [];
                        for (let cnt of question) {
                            cnt = JSON.parse(JSON.stringify(cnt));
                            delete cnt.answer;
                            if (cnt.answerOption) {
                                let answerOption = {};
                                for (let ansItem in cnt.answerOption) {
                                    let ans = cnt.answerOption[ansItem];
                                    delete ans.correct;
                                    answerOption[ansItem] = ans;
                                }
                                cnt.answerOption = answerOption;
                            }
                            updateQuestion.push({...cnt});
                        }
                        res.status(200).send({page: [{_id: pageID, question: updateQuestion, totalOption: result.totalOption, duration: doc.duration, title: doc.title}]});
                    }
                })
            }
        }).catch(err => {
            res.status(500).send(err);
        });
        return 
    }
   
    if (req.header !== null && req.header('data-categ') === 'markExam') {
        let examInfo = JSON.parse(req.body.pageID);
        let questionTotal = examInfo.questionTotal;
        qchat.findOne({$or: [{_id: examInfo.pageID, 'allowedUser.authorID': {$eq: req.user}}, {_id: examInfo.pageID, participant: {$eq: 'Public'}}]}).then(doc => {
            if (doc) {
                qcontent.findById(doc.question).then(result => {
                    if (result) {
                        let question = result.question;
                        let answer = examInfo.answer;
                        let score = 0;
                        let perMark = 100/questionTotal;
                        let pending = [];
                        for (let cnt of question) {
                            let checkAnswer = answer.filter(ans => ans._id === JSON.parse(JSON.stringify(cnt._id)))[0];
                            if (checkAnswer) {
                                if (checkAnswer.examType === 'Objective') {
                                    let correctOption = [];
                                    for (let option in cnt.answerOption) {
                                        let optionCnt = cnt.answerOption[option];
                                        if (optionCnt.correct) {
                                            correctOption.push(option);
                                        }
                                    }
                                    let checkOption = checkAnswer.option.filter(option => correctOption.filter(opt => opt === option)[0] ? true : false);
                                    if (checkOption.length === checkAnswer.option.length) {
                                        score = score + perMark;
                                    }
                                } else {
                                    pending.push({_id: cnt._id, answer: checkAnswer.answer});
                                }
                            }
                        }
                        if (pending.length < 1) {
                            if (doc.showResult) {
                                let _id = objectID();
                                let created = Date.now();
                                let cnt = {
                                    authorID: req.user, username: req.username, userImage: req.userImage,
                                    content: `Score: ${score}%   Mark: ${(score/100)*questionTotal} / ${questionTotal}`, verified: true, _id, created
                                }
                                if (doc.chat && doc.chat._id) {
                                    Promise.all([cbtchat.findByIdAndUpdate(doc.chat._id, {$push: {chat: cnt}}),
                                        qchat.findOneAndUpdate({_id: examInfo.pageID, 'chat.user.authorID': {$ne: req.user}}, {$push: {'chat.user': {authorID: req.user, username: req.username, userImage: req.userImage}}})]).then(cnt => {
                                        let total = cnt[0].chat.length + 1;
                                        qchat.findByIdAndUpdate(examInfo.pageID, {'chat.total': total}).then(result => {
                                            return res.status(200).send({pageInfo: {_id: examInfo.pageID, score, mark: (score/100)*questionTotal, showResult: doc.showResult,
                                                chat: doc.chat._id,  enableDelete: doc.enableDelete, enableComment: doc.enableComment}})
                                        })
                                    })
                                } else {
                                    let newDoc = new cbtchat({
                                        chat: [cnt]
                                    });
                                    newDoc.save().then(result => {
                                        let chat = {total: 1, _id: result._id, user: [{authorID: req.user, username: req.username, userImage: req.userImage}]};
                                        doc.updateOne({chat}).then(() => {
                                            return res.status(200).send({pageInfo: {_id: examInfo.pageID, score, mark: (score/100)*questionTotal, showResult: doc.showResult,
                                                chat: doc.chat._id, enableDelete: doc.enableDelete, enableComment: doc.enableComment}})
                                        });
                                    })
                                }
                            } else {
                                return res.status(200).send({pageInfo: {_id: examInfo.pageID, score, mark: (score/100)*questionTotal, showResult: doc.showResult, 
                                    chat: doc.chat._id, enableDelete: doc.enableDelete, enableComment: doc.enableComment}})
                            }
                        } else {
                            let mark = doc.mark;
                            mark.push({question: pending, score, questionTotal, user: {authorID: req.user, username: req.username, userImage: req.userImage}})
                            doc.updateOne({mark}).then(() => {
                                res.status(200).send({pageInfo: {_id: examInfo.pageID, pending: true}});
                            })
                        }
                    }
                })
            }
        }).catch(err => {
            res.status(500).send(err);
        });
        return 
    }
});

module.exports = router
