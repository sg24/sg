const express = require('express');
const path = require('path');
var favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const {mongoose} = require('./db/mongoose');
const hbs = require('hbs');

var appRoutes = require('./routes/app');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/partialsview');
hbs.registerPartials(__dirname + '/views/partialscomty');
hbs.registerPartials(__dirname + '/views/partialspost');
hbs.registerPartials(__dirname + '/views/partialsgroup');
hbs.registerPartials(__dirname + '/views/partialspoeters');
hbs.registerPartials(__dirname + '/views/partialsonlineque');
hbs.registerPartials(__dirname + '/views/partialsquestion');
hbs.registerPartials(__dirname + '/views/partialsglobal');
hbs.registerPartials(__dirname + '/views/partialsgroupchat');
hbs.registerPartials(__dirname + '/views/partialsprivatechat');
hbs.registerPartials(__dirname + '/views/partialsFormQue');
hbs.registerPartials(__dirname + '/views/partialsFormPost');
// app.engine('hbs', hbs({
//     defaultLayout: 'main'
// }));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});

module.exports = {app};