const http = require('http');
const path = require('path');
const utils = require('./utils');
const routes = require('./routes');

const server = http.createServer((req, res) => {
  // Handle CORS.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Always allow OPTIONS-type request.
  if (req.method === 'OPTIONS') return res.end();

  const path = utils.getPath(req.url);
  const segments = utils.getSegments(path);
  const [root] = segments;

  switch (root) {
    case 'notifications':
    case 'subscriptions':
      return routes[root](req, res, (err, data) => {
        if (err) console.log(err) || res.end(err.message);
        res.end(data);
      });
    default:
      return res.end();
  }
});

server.listen(4600, () => console.log('LISTENING ON PORT: 4600'));
