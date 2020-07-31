// module for an action

const app = require('./server-app');
const forward = require('expressjs-openwhisk')(app);

function main(request) {
  return forward(request);
}

exports.main = main;
