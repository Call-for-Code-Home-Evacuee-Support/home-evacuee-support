const express = require('express'); 								// https://www.npmjs.com/package/express
const session = require('express-session');							// https://www.npmjs.com/package/express-session
const passport = require('passport');								// https://www.npmjs.com/package/passport
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;	// https://www.npmjs.com/package/ibmcloud-appid

const app = express();


// Serve static resources
app.use(express.static('./src'));

// Start server
app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
});