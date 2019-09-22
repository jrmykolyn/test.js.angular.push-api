const webPush = require('web-push');
const db = require('../db');
const utils = require('../utils');
const vapidDetails = require('../vapid');

const notifications = (req, res, cb) => {
  switch (req.method) {
    case 'POST':
      const body = [];

      req.on('data', (chunk) => body.push(chunk));

      req.on('end', () => {
        const data = JSON.parse(body.toString());
        const { payload } = data;
        const { id, title = 'Default Title' } = payload;

        if (!id) return cb(new Error('Must include ID'));

        db.subscriptions.find({}, (err, subs) => {
          if(err) return cb(err);

          const [{ subscription }] = subs.filter((sub) => sub.id === decodeURI(id));
          if (!subscription) return cb(new Error('Invalid ID'));

          webPush.setVapidDetails(...Object.values(vapidDetails));
          webPush.sendNotification(subscription, JSON.stringify({ title }))
            .then((response) => cb(null, 'Successfully sent notification.'))
            .catch((err) => cb(new Error('Failed to send notification')))
        });
      });
      break;
    default:
      return cb(new Error('Failed to match request type: ' + req.method + '.'));
  }
};

module.exports = notifications;
