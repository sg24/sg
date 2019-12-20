const express = require('express');
const path = require('path');
var favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const passport = require('passport');

let appRoutes = require('./routes/app');
let usersRoutes = require('./routes/users');
let formRoutes = require('./routes/form');
let authRoutes = require('./routes/auth');
let sitemapxmlRoute = require('./routes/sitemapxml');
let postRoute = require('./routes/post');
let questionRoute = require('./routes/question');
let poetRoute = require('./routes/poet');
let favoriteRoute = require('./routes/favorite');
let shareRoute = require('./routes/share');
let mediaRoute = require('./routes/media');

let app = express();

app.use(cookieParser('secret'));

require('./serverDB/config/passport').auth(passport);
require('./serverDB/config/passport').authFacebook(passport);

app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/partialsviewque');
hbs.registerPartials(__dirname + '/views/partialscomty');
hbs.registerPartials(__dirname + '/views/partialspost');
hbs.registerPartials(__dirname + '/views/partialsgroup');
hbs.registerPartials(__dirname + '/views/partialspoeters');
hbs.registerPartials(__dirname + '/views/partialsonlineque');
hbs.registerPartials(__dirname + '/views/partialsquestion');
hbs.registerPartials(__dirname + '/views/partialsglobal');
hbs.registerPartials(__dirname + '/views/partialsgroupchat');
hbs.registerPartials(__dirname + '/views/partialsconv');
hbs.registerPartials(__dirname + '/views/partialsqueform');
hbs.registerPartials(__dirname + '/views/partialspostform');
hbs.registerPartials(__dirname + '/views/partialsgroupform');
hbs.registerPartials(__dirname + '/views/partialsonlinequeform');
hbs.registerPartials(__dirname + '/views/partialspoetersform');
hbs.registerPartials(__dirname + '/views/partialsloginform');
hbs.registerPartials(__dirname + '/views/partialssignupform');
hbs.registerPartials(__dirname + '/views/partialssignprfform');
hbs.registerPartials(__dirname + '/views/partialsexam');
hbs.registerPartials(__dirname + '/views/partialsusers');
hbs.registerPartials(__dirname + '/views/partialsprofile');
hbs.registerPartials(__dirname + '/views/partialsfavorite');
hbs.registerPartials(__dirname + '/views/partialsviewpt');
hbs.registerPartials(__dirname + '/views/partialsviewpwt');
hbs.registerPartials(__dirname + '/views/partialsacc');
hbs.registerPartials(__dirname + '/views/partialsforgetpwd');

app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json({limit: '100tb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '100tb', parameterLimit: 1099511627776}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, data-categ, authorization, limit, skip');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/', [appRoutes, formRoutes]);
app.use('/auth', authRoutes)
app.use('/users', usersRoutes);
app.use('/post', postRoute);
app.use('/question', questionRoute);
app.use('/poet', poetRoute);
app.use('/favorite', favoriteRoute);
app.use('/share', shareRoute);
app.use('/media', mediaRoute);
app.use('/sitemap.xml', sitemapxmlRoute);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});

module.exports = {app};