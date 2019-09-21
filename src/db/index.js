const path = require('path');
const Datastore = require('nedb');

const subscriptions = new Datastore({
  filename: path.join(__dirname, 'subscriptions.db'),
  autoload: true,
});

module.exports = {
  subscriptions,
};
