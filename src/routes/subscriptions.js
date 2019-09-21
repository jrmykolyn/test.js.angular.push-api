const db = require('../db');

const subscriptions = (req, res, cb) => {
  const body = [];

  req.on('data', (chunk) => {
    body.push(chunk);
  });

  req.on('end', () => {
    db.subscriptions.insert(JSON.parse(body.toString()), (err, data) => {
      if (err) return cb(err);
      return cb(null, data);
    });
  });
};

module.exports = subscriptions;
