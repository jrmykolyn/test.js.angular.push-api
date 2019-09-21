const webPush = require('web-push');
const utils = require('../utils');
const vapidDetails = require('../vapid');
const subscription = require('../sub');

const notifications = (req, res, cb) => {
  const { id, title = 'Default Title' } = utils.getQueryStringParams(req.url);

  if (!id) return cb(new Error('Must include ID'));

  webPush.setVapidDetails(...Object.values(vapidDetails));
  webPush.sendNotification(subscription, JSON.stringify({ title }))
    .then((response) => console.log('__ SUCCESSFULLY SENT PUSH NOTIFICATION'))
    .catch((err) => console.error('__ FAILED TO SEND PUSH NOTIFICATION'))
    .then(() => res.end());
};

module.exports = notifications;
