const mongoose = require('mongoose');
const GridFSStorage = require('multer-gridfs-storage');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  };
//   mongodb://localhost:27017/sg
const connectStatus = mongoose.connect("mongodb+srv://slodge24:philipmayowa03@cluster0-z5rab.gcp.mongodb.net/sg?retryWrites=true&w=majority", options);

const storage = new GridFSStorage({
    db: connectStatus,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
              filename,
              bucketName: 'media'
            };
            resolve(fileInfo);
        });
    }
}); 


module.exports = { connectStatus, storage }