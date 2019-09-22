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
        const newSub = JSON.parse(body.toString());
        db.subscriptions.find({}, (err, subs) => {
          const ids = subs.map(({ id }) => id);

          if (ids.includes(newSub.id)) return cb(new Error('Subscription exists for ID: ' + newSub.id));

          db.subscriptions.insert(newSub, (err, data) => {
            if (err) return cb(err);
            return cb(null, '');
          });
        });
      });
      break;
    default:
      return cb(new Error('Failed to match request type: ' + req.method + '.'));
  }
};

module.exports = subscriptions;
