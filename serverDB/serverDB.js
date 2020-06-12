require('./config/config');
const {connectStatus} = require('./db/mongoose');
const posts = require('./models/posts');
const adverts = require('./models/adverts');
const questions = require('./models/questions');
const poets = require('./models/poets');
const category = require('./models/category');
const postnotifies = require('./models/postnotifies');
const quenotifies = require('./models/quenotifies');
const pwtnotifies = require('./models/pwtnotifies');
const grpnotifies = require('./models/grpnotifies');
const grpchatnotifies = require('./models/grpchatnotifies');
const usernotifies = require('./models/usernotifies');
const viewnotifies = require('./models/viewnotifies');
const favorite = require('./models/favorites');
const comment = require('./models/comment');
const group = require('./models/group');
const user = require('./models/user');
const chat = require('./models/chat');
const chatnotifies = require('./models/chatnotifies');
const tempUser = require('./models/tempUser');
const authUser = require('./models/authuser');
const tempFile = require('./models/tempfile');
const aroundme = require('./models/aroundme');
const contest = require('./models/contest');
const qchat = require('./models/qchat');
const qcontent = require('./models/qcontent')

module.exports = {
    adverts,
    posts,
    questions,
    poets,
    category,
    user,
    group,
    tempUser,
    authUser,
    comment,
    tempFile,
    postnotifies,
    quenotifies,
    grpnotifies,
    chat,
    chatnotifies,
    grpchatnotifies,
    usernotifies,
    pwtnotifies,
    viewnotifies,
    favorite,
    aroundme,
    contest,
    qchat,
    qcontent,
    connectStatus
};

