const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  };

const connectStatus = mongoose.connect(process.env.MONGODB_URI, options);

module.exports = { connectStatus }