const { tempFile } = require('../../serverDB/serverDB');
const uuid = require('uuid');
let uploadMedia = require('./uploadmedia');
let uploadImage = require('./uploadimage');
// let checkFile = require('./checkfile');
const fs = require('fs');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const path = require('path');


let upload = (files, tempFileID, type, bucketName, coll) => {
  return new Promise((resolve, reject) => {
    let snapshot = 0;
    let imageUploaded = 0;
    let videos = [];
    let images = [];
    let imgDet = []
    
    if (!files || files.length < 1) {
      let allFile = type === 'video' ? {videos,images} : []
      return resolve(allFile)
    }

    if (files.length === undefined) {
      files = [files]
    }

    (async () => {
        for (let file of files) {
          if (type === 'video') {
            let imageName = `${file.name.split('.')[0]}.png`
            snap(file, imageName, docInfo).then((media) => {
              ++snapshot
              videos.push(media.video)
              images.push(media.image);
              if(snapshot === files.length) {
                resolve({videos,images})
              }
            }).catch(err => {
              return reject(err)
            })
          } else {
            await imagemin([`tmp/${file.path.split("\\")[1]}`], {destination: 'tmp/',plugins: [imageminJpegtran(),
                imageminPngquant({
                  quality: [0.6, 0.8]
                })
              ]
            }).then(files => {
              uploadImage({path: `./${file.path}`, filename: file.name}).then(imgInfo => {
                imgDet.push({id: imgInfo._id, filename: imgInfo.filename, type: `image/${imgInfo.filename.split('.')[1]}`})
                ++imageUploaded;
                if (imageUploaded === files.length) {
                  resolve(imgDet)
                }
              })
            })
          }
      }
    })();
  })
}

function snap(file, imageName, isUploaded) {
return new Promise((resolve, reject) => {
  require('child_process').exec(('ffmpeg -ss 00:00:1 -i ' + `./${file.path}` + ' -vframes 1 -q:v 2 ' + `./tmp/${imageName}`), function (err, stdout, stderr) {
    if (err) {
      return reject(err)
    }
    if (isUploaded) {
      fs.unlink(`./${file.path}`, function(err) {
        if (err) {
          return reject(err)
        }
        createImg(file, imageName, isUploaded).then(result => {
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    } else {
      uploadMedia({path: `./${file.path}`, filename: file.name}).then(videoInfo => {
        createImg(file, imageName, videoInfo).then(result => {
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    }
});
})
}

function createImg(file, imageName, videoInfo) {
  return new Promise((resolve, reject) => {
    let fileID = uuid();
    checkFile(imageName, 'image', 'image.files').then(docs => {
      let docInfo = docs && docs.length > 0 ? docs[0] : null;
      if (docInfo) {
        fs.unlink(`./tmp/${imageName}`, function(err) {
          if (err) {
            return reject(err)
          }
          let updateVideoInfo = {id: videoInfo._id, snapshotID: fileID, type: file.type}
          resolve({video: updateVideoInfo, image: {id: docInfo._id, videoID: fileID, videoCnt: videoInfo._id}})
        })
      } else {
        uploadImage({path: `./tmp/${imageName}`, filename: imageName}).then(imgInfo => {
          let updateVideoInfo = {id: videoInfo._id, snapshotID: fileID, type: file.type}
          resolve({video: updateVideoInfo, image: {id: imgInfo._id, videoID: fileID, videoCnt: videoInfo._id}})
        })
      }
    })
  })
}

module.exports = upload