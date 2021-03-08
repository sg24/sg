require('./config/config');
const {connectStatus} = require('./db/mongoose');
const feed = require('./models/feed');
const advert = require('./models/adverts');
const question = require('./models/questions');
const writeup = require('./models/writeup');
const mediachat = require('./models/mediachat');
const category = require('./models/category');
const favorite = require('./models/favorites');
const comment = require('./models/comment');
const group = require('./models/group');
const user = require('./models/user');
const chat = require('./models/chat');
const tempUser = require('./models/tempUser');
const tempFile = require('./models/tempfile');
const post = require('./models/post');
const contest = require('./models/contest');
const qchat = require('./models/qchat');
const qcontent = require('./models/qcontent');
const notifications = require('./models/notifications');
const page = require('./models/page');

module.exports = {
    feed,
    post,
    question,
    writeup,
    mediachat,
    category,
    user,
    group,
    tempUser,
    comment,
    tempFile,
    chat,
    favorite,
    advert,
    contest,
    qchat,
    qcontent,
    notifications,
    page,
    connectStatus
};

