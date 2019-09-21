const webPush = require('web-push');
const db = require('../db');
const utils = require('../utils');
const vapidDetails = require('../vapid');

const notifications = (req, res, cb) => {
  const { id, title = 'Default Title' } = utils.getQueryStringParams(req.url);

  if (!id) return cb(new Error('Must include ID'));

  db.subscriptions.find({}, (err, subs) => {
    const [{ subscription }] = subs.filter((sub) => sub.id === decodeURI(id));
    if (!subscription) return cb(new Error('Invalid ID'));

    webPush.setVapidDetails(...Object.values(vapidDetails));
    webPush.sendNotification(subscription, JSON.stringify({ title }))
      .then((response) => cb(null, response))
      .catch((err) => cb(new Error('Failed to send notification')))
  });

};

module.exports = notifications;
