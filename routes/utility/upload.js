const { tempFile } = require('../../serverDB/serverDB');
const uuid = require('uuid').v4;
let uploadMedia = require('./uploadmedia');
let uploadImage = require('./uploadimage');
// let checkFile = require('./checkfile');
const ffmpeg = require('ffmpeg');
const fs = require('fs');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const path = require('path');


let upload = (files, descriptions) => {
  return new Promise((resolve, reject) => {
    let snapshot = 0;
    let uploaded = 0;
    let media = [];
    descriptions = descriptions ? JSON.parse(descriptions) : null;
    
    if (!files || files.length < 1) {
      return resolve([])
    }

    if (files.length === undefined) {
      files = [files]
    }

    (async () => {
        for (let file of files) {
          let type = file.type.split('/')[0];
          if ( type === 'image') {
            await imagemin([`${file.path}`], {destination: 'tmp/',plugins: [imageminJpegtran(),
                imageminPngquant({
                  quality: [0.6, 0.8]
                })
              ]
            }).then(filesRes => {
              console.log(JSON.stringify(filesRes))
              console.log(JSON.stringify(file))
             uploadMedia(file).then(info => {
                media = getDescription(file, info, descriptions, media);
                ++uploaded;
                if (uploaded === files.length) {
                  resolve(media)
                }
              })
            })
          } else if (type === 'video') {
            try {
              let process = new ffmpeg(`./${file.path}`)
              process.then(function (video) {
                video.setVideoSize('50%').save(`tmp/${uuid()}-${file.path}`, function (error, filePath) {
                  if (!error) {
                    fs.unlink(file.path, function(err) {
                      if (!err) {
                        file.path = filePath;
                        uploadMedia(file).then(info => {
                        media = getDescription(file, info, descriptions, media);
                        ++uploaded;
                        if (uploaded === files.length) {
                          resolve(media)
                        }
                      })
                      }
                    })
                  }
                });
              }, function (err) {
                console.log('Error: ' + err);
              });
            } catch (e) {
              console.log(e.code);
              console.log(e.msg);
            }
          }else {
            await uploadMedia(file).then(info => {
              media = getDescription(file, info, descriptions, media);
              ++uploaded;
              if (uploaded === files.length) {
                resolve(media)
              }
            })
          }
          // if (type === 'video') {
          //   let imageName = `${file.name.split('.')[0]}.png`
          //   snap(file, imageName, docInfo).then((media) => {
          //     ++snapshot
          //     videos.push(media.video)
          //     images.push(media.image);
          //     if(snapshot === files.length) {
          //       resolve({videos,images})
          //     }
          //   }).catch(err => {
          //     return reject(err)
          //   })
          // } else {
          //   await imagemin([`tmp/${file.path.split("\\")[1]}`], {destination: 'tmp/',plugins: [imageminJpegtran(),
          //       imageminPngquant({
          //         quality: [0.6, 0.8]
          //       })
          //     ]
          //   }).then(files => {
          //     uploadImage({path: `./${file.path}`, filename: file.name}).then(imgInfo => {
          //       imgDet.push({id: imgInfo._id, filename: imgInfo.filename, type: `image/${imgInfo.filename.split('.')[1]}`})
          //       ++imageUploaded;
          //       if (imageUploaded === files.length) {
          //         resolve(imgDet)
          //       }
          //     })
          //   })
          // }
      }
    })();
  })
}


function getDescription(file, info, descriptions, media) {
  let isUpdated = false;
  if (descriptions ) {
    for (let desc of descriptions) {
      if (info.filename === desc.id) {
        isUpdated = true;
        media.push({id: info._id, filename: info.filename, bucket: file.type.split('/')[0], ext: `${file.type.split('/')[0]}/${info.filename.split('.')[1]}`, description: desc.content})
      }
    }
    if (!isUpdated) {
      media.push({id: info._id, filename: info.filename, bucket: file.type.split('/')[0], ext: `${file.type.split('/')[0]}/${info.filename.split('.')[1]}`, description: ''})
    }
  } else {
    media.push({id: info._id, filename: info.filename, bucket: file.type.split('/')[0], ext: `${file.type.split('/')[0]}/${info.filename.split('.')[1]}`, description: ''})
  }
  return media
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
        let updateVideoInfo = {id: videoInfo._id, type: file.type}
        resolve({video: updateVideoInfo})
        // createImg(file, imageName, videoInfo).then(result => {
        //   resolve(result)
        // }).catch(err => {
        //   reject(err)
        // })
      }).catch(err => {
          reject(err)
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