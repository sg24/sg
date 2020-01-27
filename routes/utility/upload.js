const { tempFile } = require('../../serverDB/serverDB');
const uuid = require('uuid');
let uploadMedia = require('./uploadmedia');
const fs = require('fs');


module.exports = upload = (files, userID, curFiles) => {
    return new Promise((resolve, reject) => {
      let snapshot = 0;
      let videos =[];
      let images = []
      if (!files || files.length < 1) {
        return resolve({videos,images})
      }
      for (let file of files) {
        snap(file,uuid()).then((media) => {
          ++snapshot
          videos.push(media.video)
          images.push(media.image);
          if(snapshot === files.length) {
            tempFile.findOneAndRemove({userID, files:  { $in : curFiles }}).then(() => {
              resolve({videos,images})
            }).catch(err => {b
              reject(err)
            })
            
          }
        })
      }
    })
}

function snap(file, imageName) {
  return new Promise((resolve, reject) => {
    require('child_process').exec(('ffmpeg -ss 00:00:1 -i ' + `./tmp/${file.filename}` + ' -vframes 1 -q:v 2 ' + `./tmp/${imageName}.png`), function () {
      uploadMedia({path: `./tmp/${file.filename}`, filename: file.filename}).then(videoInfo => {
        let fileID = uuid();
        let base64File  = fs.readFileSync(`./tmp/${imageName}.png`)
        let base64data = '';
          base64data += Buffer.from(base64File , 'binary').toString('base64');
          let mediaDataUrl = 'data:' + 'image/png' + ';base64,' +  base64data;
          let updateVideoInfo = {id: videoInfo._id, snapshotID: fileID, type: `video/${file.filename.split('.').pop()}`}
          fs.unlink(`./tmp/${imageName}.png`, function(err) {
            if (!err) {
              resolve({video: updateVideoInfo, image: {id: fileID, snapshot: mediaDataUrl}})
            } else {
              reject(err)
            }
          })
      })
  });
  })
}