const { share } = require('../../serverDB/serverDB');

module.exports = getshare = (req, model, field, modelProps={}, groupModel, pickID) => {
    return new Promise ((resolve, reject) => {
        share.findOne({userID: req.user}).then(shareDoc => {
            if (shareDoc && shareDoc[field]) {
                let shareField = shareDoc[field];
                if (pickID) {
                    shareField = shareField.filter(cnt => JSON.parse(JSON.stringify(cnt.ID)) === pickID);
                }
                let shareCnt = shareField.slice(0, req.body.limit);
                let removeShareCnt = shareDoc[field].splice(req.body.limit);
                let shared = 0;
                let updateResult = [];
                if (shareCnt && shareCnt.length > 0) {
                    for (let shareItem of shareCnt) {
                        let updateModel = shareItem.groupPage ?  groupModel : model;
                        updateModel.findOne({_id: shareItem.cntID, ...modelProps}).then(cnt => {
                            if (cnt) {
                                let updateCnt = JSON.parse(JSON.stringify(cnt));
                                delete updateCnt.block;
                                delete shareItem._id;
                                let chat = cnt.chat ? {chat: {...cnt.chat, user: cnt.chat.user.slice(0, 4)}} : {};
                                let groupCnt = {};
                                let qchat = {};
                                if (field == 'group') {
                                    groupCnt = {
                                        isMember: cnt.member.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user)[0] ? true : 
                                            JSON.parse(JSON.stringify(cnt.authorID)) === req.user ? true :false,
                                        isPending: cnt.request.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                                        isPendingApprove: cnt.pendingApprove.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                                        isPendingMark: cnt.mark.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                                        isPublic: cnt.roomType === 'Public',
                                        request: cnt.request.length, mark: cnt.mark.length, pendingApprove: cnt.pendingApprove.length, member: cnt.member.length
                                    }
                                }
                                if (field === 'qchat') {
                                    qchat = {
                                        takeExam: cnt.participant === 'Public' ? true :
                                            cnt.allowedUser.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user)[0] ? true : false,
                                        isPending: cnt.request.filter(cnt => JSON.parse(JSON.stringify(cnt.authorID)) === req.user).length > 0,
                                        request: cnt.request.length, mark: cnt.mark.length, allowedUser: cnt.allowedUser.length
                                    }
                                }
                                updateResult.push({...updateCnt,
                                    shareInfo: shareItem,
                                    share: cnt.share.length, favorite: cnt.favorite.length,
                                    isFavored: cnt.favorite.filter(userID => JSON.parse(JSON.stringify(userID)) === req.user).length > 0,
                                    ...groupCnt,
                                    ...chat,
                                    ...qchat
                                    });
                            }
                            ++shared;
                            if (shared === shareCnt.length) {
                                shareDoc.updateOne({[field]: removeShareCnt}).then(() => {
                                    return resolve({updateResult, loadMore: removeShareCnt.length > 0 ? true : false})
                                })
                            }
                        });
                    }
                } else {
                    resolve({updateResult: [], loadMore: false});
                }
            } else {
                resolve({updateResult: [], loadMore: false});
            }
        }).catch((err) => reject(err));
    })
}