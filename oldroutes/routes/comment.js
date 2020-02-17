const express = require('express');
const router = express.Router();
const {posts, questions, poets, user, authUser, comment, connectStatus} = require('../serverDB/serverDB');
const authenticate = require('../serverDB/middleware/authenticate');
let notifications = require('./utility/notifications');
let global = require('../global/global');

module.exports = {
   comment: (id, categ , cnts) => {
    return new Promise((resolve, reject) => {
        let model =  categ === 'post' ? posts : categ === 'question' ? questions : poets;
        model.findByIdAndUpdate(id, {$inc: {'comment': 1}}).then(() => {
            let newComment = new comment({
                authorID: global.userDet.id,
                userType: global.userDet.type,
                commentID: id,
                comment: cnts
            });
            newComment.save().then(result => {
                let model = result.userType === 'authUser' ? authUser : user;
                model.findById(result.authorID).then(userDet => {
                    let cnt = {
                        authorID: result.authorID,
                        username: userDet.username,
                        status: true,
                        offline: userDet.offline,
                        image: userDet.image,
                        comment: result.comment,
                        commentCreated: result.commentCreated,
                        _id: result._id,
                        like: false,
                        dislike: false,
                        liked: 0,
                        disliked: 0,
                        smile: false,
                        smiled: 0,
                        disabled: true
                    }
                    resolve(cnt)
                })
            }).catch(err => {
                reject(err)
            })
        })
    })
   },
   replyComment: (id, categ, cnts, commentID) => {
       return new Promise((resolve, reject) => {
        let cnt = {
            authorID: global.userDet.id,
            userType: global.userDet.type,
            comment: cnts,
            commentID
        }
        comment.findOneAndUpdate({_id: id}, {$push: {reply: cnt}}).then(result => {
            let model =  categ === 'post' ? posts : categ === 'question' ? questions : poets;
            model.findByIdAndUpdate(result.commentID, {$inc: {'comment': 1}}).then(() => {
                comment.findById(id).then(commentRes => {
                    let replyFilter = commentRes.reply.filter(reply => reply.commentID === commentID);
                    let model = replyFilter[0].userType === 'authUser' ? authUser : user;
                    model.findById(replyFilter[0].authorID).then(result => {
                        let cnt = {
                            authorID: replyFilter[0].authorID,
                            username: result.username,
                            status: true,
                            offline: result.offline,
                            image: result.image,
                            comment: replyFilter[0].comment,
                            commentCreated: replyFilter[0].commentCreated,
                            _id: replyFilter[0]._id,
                            like: false,
                            dislike: false,
                            liked: 0,
                            disliked: 0,
                            smile: false,
                            smiled: 0,
                            disabled: true
                        }
                        resolve(cnt)
                    })
                })
            })
        }).catch(err => {
            reject(err)
         })   
       })
   }
}
