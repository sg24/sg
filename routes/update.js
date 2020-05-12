const {category, posts, poets, questions, group,user, authUser, connectStatus} = require('../serverDB/serverDB');
var fs = require('fs');
let uuid = require('uuid');
let upload = require('./utility/uploadimage')

user.find({$where: function() {
    return this.image && this.image.startsWith('data:image/png')
}}).then(result => {
    for (cnt of result) {
        var string = cnt.image;
        var regex = /^data:.+\/(.+);base64,(.*)$/;

        var matches = string.match(regex);
        var ext = matches[1];
        var data = matches[2];
        var buffer = Buffer.from(data, 'base64');
        let path = `./tmp/${uuid()}.` + ext;
        fs.writeFile(path, buffer, (err) => {
            if (!err) {
                upload({path, filename: uuid()}).then(det => {
                    user.findByIdAndUpdate(cnt._id, {image: `https://wwww.slodge24.com/media/image/${det._id}`}).then((update) => {
                        console.log(update.image)
                    })
                })
            }
        });
    }
})

authUser.find({$where: function() {
    return this.image && this.image.startsWith('data:image/png')
}}).then(result => {
    for (cnt of result) {
        var string = cnt.image;
        var regex = /^data:.+\/(.+);base64,(.*)$/;

        var matches = string.match(regex);
        var ext = matches[1];
        var data = matches[2];
        var buffer = Buffer.from(data, 'base64');
        let path = `./tmp/${uuid()}.` + ext;
        fs.writeFile(path, buffer, (err) => {
            if (!err) {
                upload({path, filename: uuid()}).then(det => {
                    user.findByIdAndUpdate(cnt._id, {image: `https://wwww.slodge24.com/media/image/${det._id}`}).then((update) => {
                        console.log(update.image)
                    })
                })
            }
        });
    }
})

posts.find({$where: function() {
    return !this.userImage && !this.username
}}).then(result => {
    for (let cnt of result) {
        user.findById(cnt.authorID).then(userFnd => {
            if (!userFnd) {
                authUser.findById(cnt.authorID).then(authFnd => {
                   if (authFnd) {
                    posts.findByIdAndUpdate(cnt._id, {username: authFnd.username, userImage: authFnd.image}).then(() => {
                        console.log('update')
                    })
                   }
                })
            } else {
                posts.findByIdAndUpdate(cnt._id, {username: userFnd.username, userImage: userFnd.image}).then(() => {
                    console.log('update')
                })
            }
        })  
    }
})

poets.find({$where: function() {
    return !this.userImage && !this.username
}}).then(result => {
    for (let cnt of result) {
        user.findById(cnt.authorID).then(userFnd => {
            if (!userFnd) {
                authUser.findById(cnt.authorID).then(authFnd => {
                   if (authFnd) {
                    poets.findByIdAndUpdate(cnt._id, {username: authFnd.username, userImage: authFnd.image}).then(() => {
                        console.log('update poet')
                    })
                   }
                })
            } else {
                poets.findByIdAndUpdate(cnt._id, {username: userFnd.username, userImage: userFnd.image}).then(() => {
                    console.log('update poet')
                })
            }
        })  
    }
})
