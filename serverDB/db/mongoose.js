const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

const connectStatus = mongoose.connect("mongodb://localhost:27017/sg", options)
    .then((res) => {
        return Promise.resolve(res)
    })
    .catch(err => {
        return Promise.reject(err);
    });

module.exports = connectStatus