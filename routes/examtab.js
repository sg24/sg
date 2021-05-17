const express = require('express');
const router = express.Router();
let objectID = require('mongoose').mongo.ObjectId;

const authenticate = require('../serverDB/middleware/authenticate');
let notifications = require('./utility/notifications');
const { connectStatus, qchat, qcontent, cbtchat } = require('../serverDB/serverDB');

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
        let examInfo = JSON.parse(req.body.cnt);
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
                                    pending.push({_id: cnt._id, content: cnt.content, media: cnt.media, answer: checkAnswer.answer, correctAnswer: cnt.answer});
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
                                            res.status(200).send({pageInfo: {_id: examInfo.pageID, score, mark: (score/100)*questionTotal, showResult: doc.showResult,
                                                chat: doc.chat._id,  enableDelete: doc.enableDelete, enableComment: doc.enableComment}});
                                            return notifications('qchatResult', doc.authorID, {userID: req.user, ID: examInfo.pageID}, false);
                                        })
                                    })
                                } else {
                                    let newDoc = new cbtchat({
                                        chat: [cnt]
                                    });
                                    newDoc.save().then(result => {
                                        let chat = {total: 1, _id: result._id, user: [{authorID: req.user, username: req.username, userImage: req.userImage}]};
                                        doc.updateOne({chat}).then(() => {
                                            res.status(200).send({pageInfo: {_id: examInfo.pageID, score, mark: (score/100)*questionTotal, showResult: doc.showResult,
                                                chat: doc.chat._id, enableDelete: doc.enableDelete, enableComment: doc.enableComment}})
                                            notifications('qchatResult', doc.authorID, {userID: req.user, ID: examInfo.pageID}, false);
                                            return
                                        });
                                    })
                                }
                            } else {
                                return res.status(200).send({pageInfo: {_id: examInfo.pageID, score, mark: (score/100)*questionTotal, showResult: doc.showResult, 
                                    chat: doc.chat._id, enableDelete: doc.enableDelete, enableComment: doc.enableComment}})
                            }
                        } else {
                            let mark = doc.mark;
                            mark.push({question: pending, score, questionTotal, authorID: req.user, username: req.username, userImage: req.userImage})
                            doc.updateOne({mark}).then(() => {
                                res.status(200).send({pageInfo: {_id: examInfo.pageID, pending: true}});
                                notifications('qchatMark', doc.authorID, {userID: req.user, ID: examInfo.pageID}, false);
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
    
    if (req.header !== null && req.header('data-categ') === 'getMarkinfo') {
        let pageID = req.body.searchCnt;
        qchat.findOne({_id: pageID, authorID: req.user}).then(doc => {
            if (doc) {
                return res.status(200).send({page: [{_id: pageID, title: doc.title}]})
            }
        })
    }

    if (req.header !== null && req.header('data-categ') === 'markTheoryexam') {
        let answerInfo = JSON.parse(req.body.cnt);
        qchat.findOne({_id: answerInfo.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let questionInfo = doc.mark.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === answerInfo.cntID)[0];
                if (questionInfo) {
                    let questionTotal = questionInfo.questionTotal
                    let perScore = 100/questionTotal;
                    let score = questionInfo.score;
                    for (let ans of answerInfo.answer) {
                        if (ans.correct) {
                           score = score + perScore;
                        }
                    }
                    let updateMarkDoc = doc.mark.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) !== answerInfo.cntID);
                    let _id = objectID();
                    let created = Date.now();
                    let cnt = {
                        authorID: questionInfo.authorID, username: questionInfo.username, userImage: questionInfo.userImage,
                        content: `Score: ${score}%   Mark: ${(score/100)*questionTotal} / ${questionTotal}`, verified: true, _id, created
                    }
                    if (doc.chat && doc.chat._id) {
                        Promise.all([cbtchat.findByIdAndUpdate(doc.chat._id, {$push: {chat: cnt}}),
                            qchat.findOneAndUpdate({_id: answerInfo.pageID, 'chat.user.authorID': {$ne: questionInfo.authorID}}, {$push: {'chat.user': {authorID: questionInfo.authorID, username: questionInfo.username, userImage: questionInfo.userImage}}})]).then(cnt => {
                            let total = cnt[0].chat.length + 1;
                            qchat.findByIdAndUpdate(answerInfo.pageID, {'chat.total': total, mark: updateMarkDoc}).then(result => {
                                res.status(200).send({pageInfo: {_id: answerInfo.pageID, score, mark: (score/100)*questionTotal, showResult: doc.showResult,
                                    chat: doc.chat._id,  enableDelete: doc.enableDelete, enableComment: doc.enableComment}});
                                return notifications('qchatResult', questionInfo.authorID, {userID: doc.authorID, ID: answerInfo.pageID}, false);
                            })
                        })
                    } else {
                        let newDoc = new cbtchat({
                            chat: [cnt]
                        });
                        newDoc.save().then(result => {
                            let chat = {total: 1, _id: result._id, user: [{authorID: questionInfo.authorID, username: questionInfo.username, userImage: questionInfo.userImage}]};
                            doc.updateOne({chat, mark: updateMarkDoc}).then(() => {
                                res.status(200).send({pageInfo: {_id: answerInfo.pageID, score, mark: (score/100)*questionTotal, showResult: doc.showResult,
                                    chat: doc.chat._id, enableDelete: doc.enableDelete, enableComment: doc.enableComment}})
                                notifications('qchatResult', questionInfo.authorID, {userID: doc.authorID, ID: answerInfo.pageID}, false);
                                return
                            });
                        })
                    }
                }
            }
        })
    }
   
});

module.exports = router
