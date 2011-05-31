/*!
 * Broadcast uptime on one machine to all subscribers.
 */

var exec = require('child_process').exec
  , redisChannels = require('../');

/**
 * Create a channel manager.
 *
 * Publish machine uptime output to channel 'uptime'.
 */

var channels = redisChannels.createChannels({ db: 8 });

channels.open('uptime');

var interval = setInterval(function () {
  exec('uptime', function (err, stdout, stderr) {
    if (!err) channels.publish('uptime', stdout);
  });
}, 30*1000); // every 30 seconds

/**
 * Subscribers
 */

var subscriber1 = channels.createSubscriber('uptime')
  , subscriber2 = channels.createSubscriber('uptime')
  , subscriber3 = channels.createSubscriber('uptime');

subscriber1.on('uptime', function(data) { console.log('1', data) });
subscriber2.on('uptime', function(data) { console.log('2', data) });
subscriber3.on('message', function(data) { console.log('3', arguments) });
