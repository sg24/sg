require('./config/config');
const {connectStatus, storage} = require('./db/mongoose');
const posts = require('./models/posts');
const category = require('./models/category');
const postnotifies = require('./models/postnotifies');

module.exports = {
    posts,
    category,
    postnotifies,
    connectStatus,
    storage
};

