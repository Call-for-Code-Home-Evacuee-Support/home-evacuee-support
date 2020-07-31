// sample server for App ID
// see https://github.com/ibm-cloud-security/appid-serversdk-nodejs#readme in detail.

const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;

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

app.use(express.static(path.join(__dirname, 'dist')));
//app.use(express.static(path.join(__dirname, 'dist/js')));
//app.use(express.static(path.join(__dirname, 'dist/css')));

//const app2 = require('./js/app.a7e274c6.js');

// here, we want to protect the path '/'
// when user accesses to '/' without authentication, will redirect to '/login'
app.get('/', (req, res) => 
  //console.log(path.resolve(__dirname, 'index.html'))
  //res.sendFile(path.join(__dirname, 'bundle.js))
	//res.sendFile(path.join(__dirname, 'index.html'))
  res.sendFile(path.resolve(__dirname, 'index.html'))
);

app.get('/css/app.css', (req, res) => 
  res.sendFile(path.resolve(__dirname, 'app.css'))
);
app.get('/css/chunk-vendors.css', (req, res) => 
  res.sendFile(path.resolve(__dirname, 'chunk-vendors.css'))
);
app.get('/js/app.js', (req, res) => 
  res.sendFile(path.resolve(__dirname, 'app.js'))
);
app.get('/js/chunk-vendors.js', (req, res) => 
  res.sendFile(path.resolve(__dirname, 'chunk-vendors.js'))
);
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
app.get('/callback' 
);
// logout endpoint.
// clears authentication information from session
app.get('/logout', (req, res) => {
  WebAppStrategy.logout(req);
  res.redirect("");
});

// only when called directly, listen the port. in another case, export an express app
if (require.main === module) {
  app.listen(process.env.PORT, () => console.log(`listening at http://localhost:${process.env.PORT}`));
} else {
  module.exports = app;
}

