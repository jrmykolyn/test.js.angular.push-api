const http = require('http');
const webPush = require('web-push');
const vapidDetails = require('./vapid');
const subscription = require('./sub');

const getQueryStringParams = (url = '') => {
  if (!url.includes('?')) return {};
  return url.substring(url.indexOf('?') + 1)
    .split('&')
    .map((pair) => pair.split('='))
    .map(([key, value]) => ({ [key]: value }))
    .reduce((acc, o) => ({ ...acc, ...o }), {});
};

webPush.setVapidDetails(...Object.values(vapidDetails));

const server = http.createServer((req, res) => {
  const { id, title = 'Default Title' } = getQueryStringParams(req.url);

  if (!id) return res.end('Must include id');

  webPush.sendNotification(subscription, JSON.stringify({ title }))
    .then((response) => console.log('__ SUCCESSFULLY SENT PUSH NOTIFICATION'))
    .catch((err) => console.error('__ FAILED TO SEND PUSH NOTIFICATION'))
    .then(() => res.end());
});

server.listen(4600, () => console.log('LISTENING ON PORT: 4600'));
