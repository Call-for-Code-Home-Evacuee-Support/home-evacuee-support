const path = require('path');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;

const ROOT_PATH = "/api/v1/web/84a37694-a702-4711-9669-e91524673939/lgov/lgov-portal/index";
//const ROOT_PATH = "/api/v1/web/84a37694-a702-4711-9669-e91524673939/lgov/lgov-portal/index";
//const ROOT_PATH = "/api/v1/web/84a37694-a702-4711-9669-e91524673939/lgov/lgov-portal/";
//const ROOT_PATH = process.env.BASE_PATH || '/';
const app = express();
// need the session to manage login with App ID
app.use(session({
  // key to encrypt cookie
  secret: 'keyboard dog',
  // re-create session when session is checked
  resave: false,
  // when using HTTPS (API Gateway), should be true
  cookie: { secure: false }
}));

// add passport with App ID into express pipeline
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));
passport.use(new WebAppStrategy({
  tenantId: "b60e744b-3920-41cc-8625-f4b0a5c66ce4",
  clientId: "ce7e530b-0c13-4bf6-aaf3-f8bab1a5f558",
  secret: "YTZhZTJkZjctMWZiYy00OTFhLTk5ZTMtY2EzMGZhODlkZDEy",
  oauthServerUrl: "https://jp-tok.appid.cloud.ibm.com/oauth/v4/b60e744b-3920-41cc-8625-f4b0a5c66ce4",
  redirectUri: "https://jp-tok.functions.appdomain.cloud/api/v1/web/84a37694-a702-4711-9669-e91524673939/lgov/lgov-portal/callback"
}));

//app.use(express.static(path.join(__dirname, 'dist')));
//app.use(express.static(path.join(__dirname, 'dist/js')));
//app.use(express.static(path.join(__dirname, 'dist/css')));

//const app2 = require('./js/app.a7e274c6.js');

app.get('/login', passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
  successRedirect: ROOT_PATH,
  forceLogin: false
}));

app.get('/callback', passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
//  successRedirect: "/"
  successRedirect: ROOT_PATH
}));

app.get('/logout', (req, res) => {
  WebAppStrategy.logout(req);
  res.redirect(ROOT_PATH);
});

app.get('/css/app.css', (req,res) => {
	  res.sendFile(path.resolve(__dirname, 'dist/css/app.css'))
});
app.get('/css/chunk-vendors.css', (req,res) => {
	  res.sendFile(path.resolve(__dirname, 'dist/css/chunk-vendors.css'))
});
app.get('/js/app.js', (req,res) => {
	  res.sendFile(path.resolve(__dirname, 'dist/js/app.js'))
});
app.get('/js/chunk-vendors.js', (req,res) => {
	  res.sendFile(path.resolve(__dirname, 'dist/js/chunk-vendors.js'))
});

app.get('/', passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
  successRedirect: ROOT_PATH
}));

app.get('/index', passport.authenticate(WebAppStrategy.STRATEGY_NAME), (req,res) => {
	  res.sendFile(path.resolve(__dirname, 'dist/index.html'))
});

//app.get('/', passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
//  //successRedirect: '/',
//  sendFile(path.resolve(__dirname, 'index.html')),
//  forceLogin: false
//}));

//app.get('/',passport.authenticate(WebAppStrategy.STRATEGY_NAME), (req, res) => 
//app.get('/', (req, res) => 
  //console.log(path.resolve(__dirname, 'index.html'))
  //res.sendFile(path.join(__dirname, 'bundle.js))
	//res.sendFile(path.join(__dirname, 'index.html'))
//  res.sendFile(path.resolve(__dirname, 'index.html'))
//);

//app.get('/css/app.css', (req, res) => 
//  res.sendFile(path.resolve(__dirname, 'app.css'))
//);
//app.get('/css/chunk-vendors.css', (req, res) => 
//  res.sendFile(path.resolve(__dirname, 'chunk-vendors.css'))
//);
//app.get('/js/app.js', (req, res) => 
//  res.sendFile(path.resolve(__dirname, 'app.js'))
//);
//app.get('/js/chunk-vendors.js', (req, res) => 
//  res.sendFile(path.resolve(__dirname, 'chunk-vendors.js'))
//);
// login endpoint
// if forceLogin is true, will always redirect browser to login widget. So, don't set it to true, if redirecting '/'
// if forceLogin is false, the redirect to login widget will not occur if user is already authenticated
// callback to finish the authorization process.
// this url should be the same path registered at App ID
// will retrieve access and identity tokens from App ID service and redirect to either (in below order)
// 1. the original URL of the request that triggered authentication,
//    as persisted in HTTP session under WebAppStrategy.ORIGINAL_URL key.
// 2. successRedirect as specified in passport.authenticate(name, {successRedirect: "...."}) invocation
// 3. application root ("/")
// logout endpoint.
// clears authentication information from session

// only when called directly, listen the port. in another case, export an express app
if (require.main === module) {
  app.listen(process.env.PORT, () => console.log(`listening at http://localhost:${process.env.PORT}`));
} else {
  module.exports = app;
}

