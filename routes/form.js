const express = require('express');
const path = require('path');
const fs = require('fs'); 
const {post, page, question, group, writeup, feed, advert, qchat, qcontent, connectStatus, user} = require('../serverDB/serverDB');
const authenticate = require('../serverDB/middleware/authenticate');
let formInit = require('./utility/forminit');
let submit = require('./utility/submit');
let editForm = require('./utility/editform');
let editAdvert = require('./utility/editadvert');
let create = require('./utility/create');
let edit = require('./utility/edit');
let uploadToBucket = require('./utility/upload');
let savetemp = require('./utility/savetemp');
let submitContest = require('./utility/submitcontest');
let editContest = require('./utility/editcontest');
let editAround = require('./utility/editaround');
const router = express.Router();
let formidable = require('formidable');

fs.mkdir('./tmp', err => { 
    if (err && err.code != 'EEXIST') throw err
})

router.post('/add/post', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        savetemp(mediaList, 'post', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,
                    content: fields.content, hashTag: JSON.parse(fields.hashTag), media, tempFileID
                }
                submit(post, cnt, tempFileID, 'post').then(id => {
                    return res.status(201).send(id);
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/edit/post', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let video = form.files && form.files.video ? form.files.video : []; 
        let image = form.files && form.files.image ? form.files.image : []; 
        savetemp(video, image, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID, 'video', 'media', 'media.files').then(media => {
                uploadToBucket(image, tempFileID, 'image', 'image', 'image.files').then(image => {
                    let allVideo = form.fields && form.fields.uploadedvideo ?  [...JSON.parse(form.fields.uploadedvideo), ...media.videos] : media.videos;
                    let allSnap = form.fields && form.fields.uploadedsnap ?  [...JSON.parse(form.fields.uploadedsnap), ...media.images] : media.images;
                    let allImage = form.fields && form.fields.uploadedimage ?  [...JSON.parse(form.fields.uploadedimage), ...image] : image;
                    let mediaCnt = {
                        video: allVideo,
                        snapshot: allSnap,
                        image: allImage
                    }
                    let userModel = req.userType === 'authUser' ? authUser : user;
                    const content = form.fields;
                    connectStatus.then((result) => {
                        editForm(content, posts, mediaCnt, postnotifies, userModel, req.user, 'postID', 'subjectpost', 'post', res, category, tempFileID).then(id => {
                            res.status(201).send(id)
                        }).catch(err => {
                            res.status(500).send(err)
                        })
                    }).catch(err => {
                        res.status(500).send(err);
                    })
                }).catch(err => {
                    res.status(500).send(err);
                })
            }).catch(err => {
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/add/question', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        savetemp(mediaList, 'question', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,
                    content: fields.content, hashTag: JSON.parse(fields.hashTag), media, tempFileID
                }
                submit(question, cnt, tempFileID, 'question').then(id => {
                    return res.status(201).send(id);
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/edit/question', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let video = form.files && form.files.video ? form.files.video : []; 
        let image = form.files && form.files.image ? form.files.image : []; 
        savetemp(video, image, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID, 'video', 'media', 'media.files').then(media => {
                uploadToBucket(image, tempFileID, 'image', 'image', 'image.files').then(image => {
                    let allVideo = form.fields && form.fields.uploadedvideo ?  [...JSON.parse(form.fields.uploadedvideo), ...media.videos] : media.videos;
                    let allSnap = form.fields && form.fields.uploadedsnap ?  [...JSON.parse(form.fields.uploadedsnap), ...media.images] : media.images;
                    let allImage = form.fields && form.fields.uploadedimage ?  [...JSON.parse(form.fields.uploadedimage), ...image] : image;
                    let mediaCnt = {
                        video: allVideo,
                        snapshot: allSnap,
                        image: allImage
                    }
                    let userModel = req.userType === 'authUser' ? authUser : user;
                    const content = form.fields;
                    connectStatus.then((result) => {
                        editForm(content, questions, mediaCnt, quenotifies, userModel, req.user, 'queID', 'subjectque', 'question', res, category, tempFileID).then(id => {
                            res.status(201).send(id)
                        }).catch(err => {
                            res.status(500).send(err)
                        })
                    }).catch(err => {
                        res.status(500).send(err);
                    })
                }).catch(err => {
                    res.status(500).send(err);
                })
            }).catch(err => {
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/add/writeup', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        savetemp(mediaList, 'writeup', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,
                    content: fields.content, title: fields.title, hashTag: JSON.parse(fields.hashTag),
                    enableComment: JSON.parse(fields.comment), media, tempFileID
                }
                submit(writeup, cnt, tempFileID, 'writeup').then(id => {
                    return res.status(201).send(id);
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/edit/poet', authenticate,(req, res, next) => {
    formInit(req, formidable).then(form => {
        let video = form.files && form.files.video ? form.files.video : []; 
        let image = form.files && form.files.image ? form.files.image : []; 
        savetemp(video, image, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID, 'video', 'media', 'media.files').then(media => {
                uploadToBucket(image, tempFileID, 'image', 'image', 'image.files').then(image => {
                    let allVideo = form.fields && form.fields.uploadedvideo ?  [...JSON.parse(form.fields.uploadedvideo), ...media.videos] : media.videos;
                    let allSnap = form.fields && form.fields.uploadedsnap ?  [...JSON.parse(form.fields.uploadedsnap), ...media.images] : media.images;
                    let allImage = form.fields && form.fields.uploadedimage ?  [...JSON.parse(form.fields.uploadedimage), ...image] : image;
                    let mediaCnt = {
                        video: allVideo,
                        snapshot: allSnap,
                        image: allImage
                    }
                    let userModel = req.userType === 'authUser' ? authUser : user;
                    const content = form.fields;
                    connectStatus.then((result) => {
                        editForm(content, poets, mediaCnt, pwtnotifies, userModel, req.user, 'pwtID', 'subjectpoet', 'poet', res, category, tempFileID).then(id => {
                            res.status(201).send(id)
                        }).catch(err => {
                            res.status(500).send(err)
                        })
                    }).catch(err => {
                        res.status(500).send(err);
                    })
                }).catch(err => {
                    res.status(500).send(err);
                })
            }).catch(err => {
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/add/chatRoom', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        let askQuestion = JSON.parse(fields.cbt);
        savetemp(mediaList, askQuestion ? 'qcontent' : 'group', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let groupMedia = []
                for (let cnt of media){
                    if (cnt.filename && (cnt.filename.split('--')[0] === fields.id)) {
                        groupMedia.push(cnt);
                    }
                }
                let questionMedia = [];
                let updateQuestion = [];
                for (let question of JSON.parse(fields.question)) {
                    questionMedia = []
                    for (let cnt of media){
                        if (cnt.filename && (cnt.filename.split('--')[0] === question.id)) {
                            questionMedia.push(cnt);
                        }
                    }
                    delete question.id;
                    question.media = questionMedia;
                    updateQuestion.push(question);
                }
                Promise.all([askQuestion ? submit(qcontent, {question: updateQuestion, tempFileID}, tempFileID, null) : 
                    Promise.resolve(null)]).then(id => {
                    let cnt = {
                        authorID: req.user, username: req.username, userImage: req.userImage,
                        content: fields.content, title: fields.title, hashTag: JSON.parse(fields.hashTag),
                        autoJoin: JSON.parse(fields.autoJoin), enableCbt: JSON.parse(fields.cbt),
                        enableRule: JSON.parse(fields.rule), roomType: fields.roomType,passMark: fields.passMark,
                        hour: fields.hour, minute: fields.minute, second: fields.second, 
                        duration: fields.duration, qchatTotal: fields.questionTotal, media: groupMedia, 
                        question: id[0], tempFileID
                    }
                    submit(group, cnt, tempFileID, 'createGroup').then(id => {
                        return res.status(201).send(id);
                    })
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/edit/group', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let video = form.files && form.files.video ? form.files.video : []; 
        let image = form.files && form.files.image ? form.files.image : []; 
        savetemp(video, image, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID, 'video', 'media', 'media.files').then(media => {
                uploadToBucket(image, tempFileID, 'image', 'image', 'image.files').then(image => {
                    let allVideo = form.fields && form.fields.uploadedvideo ?  [...JSON.parse(form.fields.uploadedvideo), ...media.videos] : media.videos;
                    let allSnap = form.fields && form.fields.uploadedsnap ?  [...JSON.parse(form.fields.uploadedsnap), ...media.images] : media.images;
                    let allImage = form.fields && form.fields.uploadedimage ?  [...JSON.parse(form.fields.uploadedimage), ...image] : image;
                    let mediaCnt = {
                        video: allVideo,
                        snapshot: allSnap,
                        image: allImage
                    }
                    let userModel = req.userType === 'authUser' ? authUser : user;
                    const content = form.fields;
                    connectStatus.then((result) => {
                       edit(content, group, mediaCnt, grpnotifies, userModel, req.user,  'group', res, category, tempFileID).then(id =>
                            res.status(201).send(id)
                        ).catch(err => {
                            res.status(500).send(err)
                        })
                    }).catch(err => {
                        res.status(500).send(err);
                    })
                }).catch(err => {
                    res.status(500).send(err);
                })
            }).catch(err => {
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/add/advert', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        savetemp(mediaList, 'advert', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,
                    content: fields.content, title: fields.title, button: JSON.parse(fields.button),
                    enableComment: JSON.parse(fields.comment), media, tempFileID
                }
                submit(advert, cnt, tempFileID, 'advert').then(id => {
                    return res.status(201).send(id);
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/edit/advert', authenticate,(req, res, next) => {
    formInit(req, formidable).then(form => {
        let video = form.files && form.files.video ? form.files.video : []; 
        let image = form.files && form.files.image ? form.files.image : []; 
        savetemp(video, image, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID, 'video', 'media', 'media.files').then(media => {
                uploadToBucket(image, tempFileID, 'image', 'image', 'image.files').then(image => {
                    let allVideo = form.fields && form.fields.uploadedvideo ?  [...JSON.parse(form.fields.uploadedvideo), ...media.videos] : media.videos;
                    let allSnap = form.fields && form.fields.uploadedsnap ?  [...JSON.parse(form.fields.uploadedsnap), ...media.images] : media.images;
                    let allImage = form.fields && form.fields.uploadedimage ?  [...JSON.parse(form.fields.uploadedimage), ...image] : image;
                    let mediaCnt = {
                        video: allVideo,
                        snapshot: allSnap,
                        image: allImage
                    }
                    let userModel = req.userType === 'authUser' ? authUser : user;
                    const content = form.fields;
                    connectStatus.then((result) => {
                        editAdvert(content, adverts, mediaCnt, userModel, req.user, category, tempFileID).then(id => {
                            res.status(201).send(id)
                        }).catch(err => {
                            res.status(500).send(err)
                        })
                    }).catch(err => {
                        res.status(500).send(err);
                    })
                }).catch(err => {
                    res.status(500).send(err);
                })
            }).catch(err => {
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/add/feed', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        savetemp(mediaList, 'feed', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let cnt = {
                    authorID: req.user, username: req.username, userImage: req.userImage,
                    content: fields.content, title: fields.title, hashTag: JSON.parse(fields.hashTag),
                    enableComment: JSON.parse(fields.comment), media, tempFileID
                }
                submit(feed, cnt, tempFileID, 'feed').then(id => {
                    return res.status(201).send(id);
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})


router.post('/edit/aroundme', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let video = form.files && form.files.video ? form.files.video : []; 
        let image = form.files && form.files.image ? form.files.image : []; 
        savetemp(video, image, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID, 'video', 'media', 'media.files').then(media => {
                uploadToBucket(image, tempFileID, 'image', 'image', 'image.files').then(image => {
                    let allVideo = form.fields && form.fields.uploadedvideo ?  [...JSON.parse(form.fields.uploadedvideo), ...media.videos] : media.videos;
                    let allSnap = form.fields && form.fields.uploadedsnap ?  [...JSON.parse(form.fields.uploadedsnap), ...media.images] : media.images;
                    let allImage = form.fields && form.fields.uploadedimage ?  [...JSON.parse(form.fields.uploadedimage), ...image] : image;
                    let mediaCnt = {
                        video: allVideo,
                        snapshot: allSnap,
                        image: allImage
                    }
                    let userModel = req.userType === 'authUser' ? authUser : user;
                    const content = form.fields;
                    connectStatus.then((result) => {
                        editAround(content, aroundme, mediaCnt, userModel, {authorID: req.user, username: req.username, userImage: req.userImage, userType: req.userType}, [], tempFileID).then(id =>
                            res.status(201).send(id)
                        ).catch(err => {
                            res.status(500).send(err)
                        })
                    }).catch(err => {
                        res.status(500).send(err);
                    })
                }).catch(err => {
                    res.status(500).send(err);
                })
            }).catch(err => {
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/add/contest', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let video = form.files && form.files.video ? form.files.video : []; 
        let image = form.files && form.files.image ? form.files.image : []; 
        savetemp(video, image, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID, 'video', 'media', 'media.files').then(media => {
                uploadToBucket(image, tempFileID, 'image', 'image', 'image.files').then(image => {
                    let mediaCnt = {
                        video: media.videos,
                        snapshot: media.images,
                        image
                    }
                    let userModel = req.userType === 'authUser' ? authUser : user;
                    const content = form.fields;
                    connectStatus.then((result) => {
                        submitContest(content, contest, mediaCnt, userModel, {authorID: req.user, username: req.username, userImage: req.userImage, userType: req.userType}, [], tempFileID).then(id =>
                            res.status(201).send(id)
                        ).catch(err => {
                            res.status(500).send(err)
                        })
                    }).catch(err => {
                        res.status(500).send(err);
                    })
                }).catch(err => {
                    res.status(500).send(err);
                })
            }).catch(err => {
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})


router.post('/edit/contest', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let video = form.files && form.files.video ? form.files.video : []; 
        let image = form.files && form.files.image ? form.files.image : []; 
        savetemp(video, image, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID, 'video', 'media', 'media.files').then(media => {
                uploadToBucket(image, tempFileID, 'image', 'image', 'image.files').then(image => {
                    let allVideo = form.fields && form.fields.uploadedvideo ?  [...JSON.parse(form.fields.uploadedvideo), ...media.videos] : media.videos;
                    let allSnap = form.fields && form.fields.uploadedsnap ?  [...JSON.parse(form.fields.uploadedsnap), ...media.images] : media.images;
                    let allImage = form.fields && form.fields.uploadedimage ?  [...JSON.parse(form.fields.uploadedimage), ...image] : image;
                    let mediaCnt = {
                        video: allVideo,
                        snapshot: allSnap,
                        image: allImage
                    }
                    let userModel = req.userType === 'authUser' ? authUser : user;
                    const content = form.fields;
                    connectStatus.then((result) => {
                        editContest(content, contest, mediaCnt, userModel, {authorID: req.user, username: req.username, userImage: req.userImage, userType: req.userType}, [], tempFileID).then(id =>
                            res.status(201).send(id)
                        ).catch(err => {
                            res.status(500).send(err)
                        })
                    }).catch(err => {
                        res.status(500).send(err);
                    })
                }).catch(err => {
                    res.status(500).send(err);
                })
            }).catch(err => {
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/add/cbt', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let mediaList = form.files && form.files.media ? form.files.media : [];
        let fields = form.fields
        savetemp(mediaList, 'qcontent', req.user).then(tempFileID => {
            uploadToBucket(mediaList, fields.description).then(media => {
                let cbtMedia = []
                for (let cnt of media){
                    if (cnt.filename && (cnt.filename.split('--')[0] === fields.id)) {
                        cbtMedia.push(cnt);
                    }
                }
                let questionMedia = [];
                let updateQuestion = [];
                for (let question of JSON.parse(fields.question)) {
                    questionMedia = []
                    for (let cnt of media){
                        if (cnt.filename && (cnt.filename.split('--')[0] === question.id)) {
                            questionMedia.push(cnt);
                        }
                    }
                    delete question.id;
                    question.media = questionMedia;
                    updateQuestion.push(question);
                }
                submit(qcontent, {question: updateQuestion, tempFileID}, tempFileID, null).then(id => {
                    let cnt = {
                        authorID: req.user, username: req.username, userImage: req.userImage,
                        content: fields.content, title: fields.title, hashTag: JSON.parse(fields.hashTag),
                        enableComment: JSON.parse(fields.comment), enableDelete: JSON.parse(fields.delete),
                        showResult: JSON.parse(fields.result), participant: fields.participant,
                        hour: fields.hour, minute: fields.minute, second: fields.second, 
                        duration: fields.duration, qchatTotal: fields.questionTotal, media: cbtMedia, 
                        question: id, tempFileID
                    }
                    submit(qchat, cnt, tempFileID, 'qchat').then(id => {
                        return res.status(201).send(id);
                    })
                })
            })
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})


router.post('/edit/cbt', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let files = form.files ? form.files : {};
        let video = [];
        let image = [];
        for (let cnt in files) {
            if (files[cnt].length !== undefined) {
                for (let itm of files[cnt]) {
                    updateMedia(itm, cnt)
                }
            } else {
                updateMedia(files[cnt], cnt)
            }
        }

        function updateMedia(cnt, position) {
            if (cnt.type.startsWith('video')) {
                video.push({...cnt, position});
            }
            if (cnt.type.startsWith('image')) {
                image.push({...cnt, position});
            }
        }
        
        savetemp(video, image, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID, 'video', 'media', 'media.files').then(media => {
                uploadToBucket(image, tempFileID, 'image', 'image', 'image.files').then(image => {
                    updateAllMedia(media.videos, 'video', []).then(videoCnt => {
                        updateAllMedia(media.images, 'snapshot', videoCnt).then(imageCnt => {
                            updateAllMedia(image, 'image', imageCnt).then(mediaCnt => {
                                let userModel = req.userType === 'authUser' ? authUser : user;
                                const content = JSON.parse(form.fields.cbt);
                                const removedMedia = form.fields.removedmedia ? JSON.parse(form.fields.removedmedia) : []
                                connectStatus.then((result) => {
                                    let uploadedvideo = [];
                                    let uploadedimage = [];
                                    let uploadedsnap = [];
                                    for (let cnt of content) {
                                        if (cnt.video.length > 0) {
                                            uploadedvideo.push(...cnt.video)
                                        }
                                        if (cnt.image.length > 0) {
                                            uploadedimage.push(...cnt.image)
                                        }
                                        if (cnt.snapshot.length > 0) {
                                            uploadedsnap.push(...cnt.snapshot)
                                        }
                                    }
                                    updateAllMedia(uploadedsnap, 'snapshot', mediaCnt).then(mediaSnap => {
                                        updateAllMedia(uploadedimage, 'image', mediaSnap).then(mediaimage => {
                                            updateAllMedia(uploadedvideo, 'video', mediaimage).then(allMedia => {
                                                editcbt(content, removedMedia, cbt, allMedia, userModel, {authorID: req.user, username: req.username, userImage: req.userImage, userType: req.userType}, tempFileID).then(id =>
                                                    res.status(201).send(id)
                                                ).catch(err => {
                                                    res.status(500).send(err)
                                                })
                                            })
                                        })
                                    })
                                }).catch(err => {
                                    res.status(500).send(err);
                                })
                            })
                        })
                    })
                    function updateAllMedia(items, key, media) {
                        return new Promise((resolve, reject) => {
                            for (let itm of items) {
                                let filterMedia = media.filter(cnt => cnt.position === itm.position)[0];
                                if (filterMedia) {
                                    let cnt = {...filterMedia};
                                    cnt[key].push(itm);
                                    let index = media.findIndex(cnt => cnt.position === itm.position);
                                    media[index] = cnt;
                                } else {
                                    let mediaItms  = {image: [], video: [], snapshot: []}
                                    mediaItms[key].push(itm);
                                    media.push({position: itm.position, ...mediaItms})
                                }
                            }
                            resolve(media)
                        })
                    }
                }).catch(err => {
                    res.status(500).send(err);
                })
            }).catch(err => {
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

router.post('/add/page', authenticate, (req, res, next) => {
    formInit(req, formidable).then(form => {
        let video = form.files && form.files.video ? form.files.video : []; 
        let image = form.files && form.files.image ? form.files.image : []; 
        savetemp(video, image, req.user).then(tempFileID => {
            uploadToBucket(video, tempFileID, 'video', 'media', 'media.files').then(media => {
                uploadToBucket(image, tempFileID, 'image', 'image', 'image.files').then(image => {
                    let mediaCnt = {
                        snapshot: media.images,
                        image
                    }
                    const content = form.fields;
                    connectStatus.then((result) => {
                        create(content, page, mediaCnt, req.user, 'page', '/page', 'pageInvite', tempFileID).then(id =>
                            res.status(201).send(id)
                        ).catch(err => {
                            res.status(500).send(err)
                        })
                    }).catch(err => {
                        res.status(500).send(err);
                    })
                }).catch(err => {
                    res.status(500).send(err);
                })
            }).catch(err => {
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})


module.exports = router
