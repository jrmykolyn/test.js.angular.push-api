const vapidDetails = require('../vapid');

const keys = (req, res, cb) => {
  switch (req.method) {
    case 'GET':
      return cb(null, JSON.stringify([{ publicKey: vapidDetails.publicKey }]));
    default:
      return cb(new Error('Failed to match request type: ' + req.method + '.'));
  }
};

module.exports = keys;
