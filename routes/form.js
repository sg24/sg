const express = require('express');
const path = require('path');
const fs = require('fs'); 
const {posts, questions, group, poets, aroundme, adverts, contest, qchat, category, tempFile, postnotifies, quenotifies, viewnotifies, pwtnotifies, grpnotifies, connectStatus, user, authUser} = require('../serverDB/serverDB');
const authenticate = require('../serverDB/middleware/authenticate');
let notifications = require('./utility/notifications');
let formInit = require('./utility/forminit');
let submit = require('./utility/submit');
let editForm = require('./utility/editform');
let editAdvert = require('./utility/editadvert');
let create = require('./utility/create');
let edit = require('./utility/edit');
let uploadToBucket = require('./utility/qchatupload');
let savetemp = require('./utility/savetemp');
let submitAdvert = require('./utility/submitadvert');
let submitAround = require('./utility/submitaround');
let submitContest = require('./utility/submitcontest');
let submitQchat = require('./utility/submitqchat');
let editQchat = require('./utility/editqchat');
let editContest = require('./utility/editcontest');
const router = express.Router();
let formidable = require('formidable');

fs.mkdir('./tmp', err => { 
    if (err && err.code != 'EEXIST') throw err
})

router.post('/add/post', authenticate, (req, res, next) => {
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
                        submit(content, posts, mediaCnt, postnotifies, viewnotifies, userModel, {authorID: req.user, username: req.username, userImage: req.userImage}, 'postID', 'subjectpost', 'post', 'postpub', res, category, tempFileID).then(id =>
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
                        submit(content, questions, mediaCnt, quenotifies, viewnotifies, userModel, {authorID: req.user, username: req.username, userImage: req.userImage}, 'queID', 'subjectque', 'question', 'quepub', res, category, tempFileID).then(id =>
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

router.post('/add/poet', authenticate, (req, res, next) => {
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
                        submit(content, poets,mediaCnt, pwtnotifies, viewnotifies, userModel, {authorID: req.user, username: req.username, userImage: req.userImage}, 'pwtID', 'subjectpoet', 'poet', 'pwtpub', res, category, tempFileID).then(id =>
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

router.post('/add/group', authenticate, (req, res, next) => {
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
                        create(content, group, mediaCnt, grpnotifies, userModel, req.user, 'group', 'groups', res, category, tempFileID).then(id =>
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
                        submitAdvert(content, adverts, mediaCnt, userModel, {authorID: req.user, username: req.username, userImage: req.userImage}, category, tempFileID).then(id =>
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

router.post('/add/aroundme', authenticate, (req, res, next) => {
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
                        submitAround(content, aroundme, mediaCnt, userModel, {authorID: req.user, username: req.username, userImage: req.userImage, userType: req.userType}, [], tempFileID).then(id =>
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

router.post('/add/qchat', authenticate, (req, res, next) => {
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
                                const content = JSON.parse(form.fields.qchat);
                                connectStatus.then((result) => {
                                    submitQchat(content, qchat, mediaCnt, userModel, {authorID: req.user, username: req.username, userImage: req.userImage, userType: req.userType}, tempFileID).then(id =>
                                        res.status(201).send(id)
                                    ).catch(err => {
                                        res.status(500).send(err)
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


router.post('/edit/qchat', authenticate, (req, res, next) => {
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
                                const content = JSON.parse(form.fields.qchat);
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
                                                editQchat(content, removedMedia, qchat, allMedia, userModel, {authorID: req.user, username: req.username, userImage: req.userImage, userType: req.userType}, tempFileID).then(id =>
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

module.exports = router
