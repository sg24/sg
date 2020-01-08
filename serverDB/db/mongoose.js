const mongoose = require('mongoose');
const GridFSStorage = require('multer-gridfs-storage');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  };
let uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sg'
const connectStatus = mongoose.connect(uri, options);

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