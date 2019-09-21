const db = require('../db');

const subscriptions = (req, res, cb) => {
  switch (req.method) {
    case 'GET':
      db.subscriptions.find({}, (err, subs) => {
        if (err) return cb(new Error('Failed to retrieve subscriptions.'));
        const subIds = subs.map((sub) => ({ id: sub.id }));
        return cb(null, JSON.stringify(subIds));
      });
      break;
    case 'POST':
      const body = [];

      req.on('data', (chunk) => {
        body.push(chunk);
      });

      req.on('end', () => {
        db.subscriptions.insert(JSON.parse(body.toString()), (err, data) => {
          if (err) return cb(err);
          return cb(null, '');
        });
      });
      break;
    default:
      return cb(new Error('Failed to match request type: ' + req.method + '.'));
  }
};

module.exports = subscriptions;
