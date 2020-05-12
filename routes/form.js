const express = require('express');
const path = require('path');
const fs = require('fs'); 
const {posts, questions, group, poets,category, tempFile, postnotifies, quenotifies, viewnotifies, pwtnotifies, grpnotifies, connectStatus, user, authUser} = require('../serverDB/serverDB');
const authenticate = require('../serverDB/middleware/authenticate');
let notifications = require('./utility/notifications');
let formInit = require('./utility/forminit');
let submit = require('./utility/submit');
let editForm = require('./utility/editform');
let create = require('./utility/create');
let edit = require('./utility/edit');
let uploadToBucket = require('./utility/upload');
let savetemp = require('./utility/savetemp');
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

module.exports = router
