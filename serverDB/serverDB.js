require('./config/config');
const {connectStatus, storage} = require('./db/mongoose');
const posts = require('./models/posts');
const questions = require('./models/questions');
const category = require('./models/category');
const postnotifies = require('./models/postnotifies');

module.exports = {
    posts,
    questions,
    category,
    postnotifies,
    connectStatus,
    storage
};

