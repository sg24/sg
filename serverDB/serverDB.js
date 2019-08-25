require('./config/config');
require('./db/mongoose');
const posts = require('./models/posts');

const serverDB = {
    posts
};

module.exports = {serverDB};

