const express = require('express');
const router = express.Router();
let objectID = require('mongoose').mongo.ObjectId;

const authenticate = require('../serverDB/middleware/authenticate');
let notifications = require('./utility/notifications');
let sequence = require('./utility/sequence');
const { connectStatus, qchat, qcontent, cbtchat, group } = require('../serverDB/serverDB');

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
   
    if (req.header !== null && req.header('data-categ') === 'getGroupexam') {
        let pageID = req.body.searchCnt;
        group.findById(pageID).then(doc => {
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

    if (req.header !== null && req.header('data-categ') === 'markGroupExam') {
        let examInfo = JSON.parse(req.body.cnt);
        let questionTotal = examInfo.questionTotal;
        group.findById(examInfo.pageID).then(doc => {
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
                            if (doc.autoJoin) {
                                if (doc.autoJoin && (score >= doc.passMark)) {
                                    let checkMember = doc.member.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user)[0];
                                    if (!checkMember) {
                                        doc.member.push(req.user);
                                        doc.updateOne({member: doc.member}).then(() => {
                                            res.status(200).send({pageInfo: {_id: examInfo.pageID, score, mark: (score/100)*questionTotal, passed: true}});
                                            return notifications('groupJoin', doc.authorID, {userID: req.user, ID: examInfo.pageID}, false);
                                        })
                                    }
                                } else {
                                    return res.status(200).send({pageInfo: {_id: examInfo.pageID, score, mark: (score/100)*questionTotal, passed: false}});
                                }
                            } else {
                                let pending = doc.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user)[0];
                                if (!pending) {
                                    let _id = objectID();
                                    doc.pendingApprove.push({_id, score, questionTotal, authorID: req.user, username: req.username, userImage: req.userImage});
                                    doc.updateOne({pendingApprove: doc.pendingApprove}).then(() => {
                                        res.status(200).send({pageInfo: {_id: examInfo.pageID, score, mark: (score/100)*questionTotal, pendingApprove: true}});
                                        return notifications('groupPending', doc.authorID, {userID: req.user, ID: examInfo.pageID}, false);
                                    })
                                }
                            }
                        } else {
                            let mark = doc.mark;
                            mark.push({question: pending, score, questionTotal, authorID: req.user, username: req.username, userImage: req.userImage})
                            doc.updateOne({mark}).then(() => {
                                res.status(200).send({pageInfo: {_id: examInfo.pageID, pending: true}});
                                notifications('groupMark', doc.authorID, {userID: req.user, ID: examInfo.pageID}, false);
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

    if (req.header !== null && req.header('data-categ') === 'getMarkGroupinfo') {
        let pageID = req.body.searchCnt;
        group.findOne({_id: pageID, authorID: req.user}).then(doc => {
            if (doc) {
                return res.status(200).send({page: [{_id: pageID}]})
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
   
    if (req.header !== null && req.header('data-categ') === 'markGroupTheoryexam') {
        let answerInfo = JSON.parse(req.body.cnt);
        group.findOne({_id: answerInfo.pageID, authorID: req.user}).then(doc => {
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
                    
                    if (doc.autoJoin) {
                        if (doc.autoJoin && (score >= doc.passMark)) {
                            let checkMember = doc.member.filter(userID => JSON.parse(JSON.stringify(userID)) === questionInfo.authorID)[0];
                            if (!checkMember) {
                                doc.member.push(questionInfo.authorID);
                                doc.updateOne({member: doc.member, mark: updateMarkDoc}).then(() => {
                                    res.status(200).send({pageInfo: {_id: answerInfo.pageID, score, mark: (score/100)*questionTotal, passed: true}});
                                    return notifications('groupAccept', questionInfo.authorID, {userID: req.user, ID: answerInfo.pageID}, false);
                                })
                            }
                        } else {
                            doc.updateOne({mark: updateMarkDoc}).then(() => {
                               res.status(200).send({pageInfo: {_id: answerInfo.pageID, score, mark: (score/100)*questionTotal, passed: false}});
                               sequence([notifications('groupMark', req.user, {userID: questionInfo.authorID, ID: answerInfo.pageID}, true),
                                    notifications('groupAccept', questionInfo.authorID, {userID: req.user, ID: answerInfo.pageID}, true),
                                    notifications('groupReject', questionInfo.authorID, {userID: req.user, ID: answerInfo.pageID}, false)
                                ])
                                return
                            });
                        }
                    } else {
                        let pending = doc.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === questionInfo.authorID)[0];
                        if (!pending) {
                            let _id = objectID();
                            doc.pendingApprove.push({_id, score, questionTotal, authorID: questionInfo.authorID, username: questionInfo.username, userImage: questionInfo.userImage});
                            doc.updateOne({pendingApprove: doc.pendingApprove, mark: updateMarkDoc}).then(() => {
                                res.status(200).send({pageInfo: {_id: answerInfo.pageID, score, mark: (score/100)*questionTotal, pendingApprove: true, pending: _id}});
                                return notifications('groupPending', doc.authorID, {userID: questionInfo.authorID, ID: answerInfo.pageID}, false);
                            })
                        }
                    }
                }
            }
        })
    }

    if (req.header !== null && req.header('data-categ') === 'setGroupacceptuser') {
        group.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let pendingApproveCnt = JSON.parse(req.body.cnt);
                let reaction = 0;
                for (let cntItem of pendingApproveCnt) {
                    let pendingApprove = doc.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === cntItem)[0];
                    if (pendingApprove) {
                        let member = doc.member;
                        let isAllowed = member.filter(userID=> JSON.parse(JSON.stringify(userID)) === pendingApprove.authorID)[0];
                        if (!isAllowed) {
                            member.push(pendingApprove.authorID);
                        }
                        doc.pendingApprove = doc.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) !== cntItem);
                        doc.updateOne({pendingApprove: doc.pendingApprove, member}).then(() => {
                            sequence([notifications('groupPending', req.user, {userID: pendingApprove.authorID, ID: req.body.pageID}, true),
                                notifications('groupReject', pendingApprove.authorID, {userID: req.user, ID: req.body.pageID}, true),
                                notifications('groupAccept', pendingApprove.authorID, {userID: req.user, ID: req.body.pageID}, false)
                            ])
                            ++reaction;
                            if (reaction === pendingApproveCnt.length) {
                                res.status(200).send({pageInfo: {_id: req.body.pageID, pendingApprove: false, passed: true}});
                            }
                        }).catch(err => {
                            res.status(500).send(err);
                        })
                    }
                }
            }
        });
        return
    }

    if (req.header !== null && req.header('data-categ') === 'setGrouprejectuser') {
        group.findOne({_id: req.body.pageID, authorID: req.user}).then(doc => {
            if (doc) {
                let pendingApproveCnt = JSON.parse(req.body.cnt);
                let reaction = 0;
                for (let cntItem of pendingApproveCnt) {
                    let pendingApprove = doc.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) === cntItem)[0];
                    if (pendingApprove) {
                        doc.pendingApprove = doc.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt._id)) !== cntItem);
                        doc.updateOne({pendingApprove: doc.pendingApprove}).then(() => {
                            sequence([notifications('groupPending', req.user, {userID: pendingApprove.authorID, ID: req.body.pageID}, true),
                                notifications('groupAccept', pendingApprove.authorID, {userID: req.user, ID: req.body.pageID}, true),
                                notifications('groupReject', pendingApprove.authorID, {userID: req.user, ID: req.body.pageID}, false)]).catch()
                                ++reaction;
                                if (reaction === pendingApproveCnt.length) {
                                    res.status(200).send({pageInfo: {_id: req.body.pageID, pendingApprove: false}});
                                }
                        }).catch(err => {
                            res.status(500).send(err);
                        })
                    }
                }
            }
        });
        return
    }
});

module.exports = router
