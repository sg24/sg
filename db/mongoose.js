var mongoose = require('mongoose');
// mongoose.openUri('mongodb://localhost:27017/node-angular',)
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/sgDatabase', {
    useMongoClient: true
})
.then(() => {

}).catch((e) => console.log(e));

module.exports.mongoose = mongoose;