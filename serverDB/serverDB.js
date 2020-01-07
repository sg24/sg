require('./config/config');
const {connectStatus, storage} = require('./db/mongoose');
const posts = require('./models/posts');
const questions = require('./models/questions');
const poets = require('./models/poets');
const category = require('./models/category');
const postnotifies = require('./models/postnotifies');
const quenotifies = require('./models/quenotifies');
const pwtnotifies = require('./models/pwtnotifies');
const usernotifies = require('./models/usernotifies');
const viewnotifies = require('./models/viewnotifies');
const favorite = require('./models/favorites');
const comment = require('./models/comment');
const user = require('./models/user');
const tempUser = require('./models/tempUser');
const authUser = require('./models/authuser');

module.exports = {
    posts,
    questions,
    poets,
    category,
    user,
    tempUser,
    authUser,
    comment,
    postnotifies,
    quenotifies,
    usernotifies,
    pwtnotifies,
    viewnotifies,
    favorite,
    connectStatus,
    storage
};

