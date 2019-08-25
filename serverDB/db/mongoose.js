const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true
  };

mongoose.connect("mongodb://localhost:27017/sg", options)
    .then((res) => {console.log(res)})
    .catch((err) => {console.log(err, this)});
