const path = require('path');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;

const ROOT_PATH = process.env.ROOT_PATH;
const app = express();
// need the session to manage login with App ID
app.use(session({
  secret: 'keyboard dog',
  resave: false,
  cookie: { secure: false }
}));

// add passport with App ID into express pipeline
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));
passport.use(new WebAppStrategy({
  tenantId: process.env.TENANT_ID,
  clientId: process.env.CLIENT_ID,
  secret: process.env.SECRET,
  oauthServerUrl: process.env.OAUTH_SERVER_URL,
  redirectUri: process.env.REDIRECT_URI
}));

app.get('/login', passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
  successRedirect: ROOT_PATH,
  forceLogin: false
}));

app.get('/callback', passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
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

if (require.main === module) {
  app.listen(process.env.PORT, () => console.log(`listening at http://localhost:${process.env.PORT}`));
} else {
  module.exports = app;
}

