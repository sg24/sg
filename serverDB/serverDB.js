require('./config/config');
const connectStatus = require('./db/mongoose');
const posts = require('./models/posts');
const category = require('./models/category');
const media = require('./models/media');

module.exports = {
    posts,
    category,
    media,
    connectStatus
};

