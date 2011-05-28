
var redis = require('redis');
//  , redisChannels = require('redis-channels');

var channels = redis.createClient();

var channelKey = options.channelKey || 'redis-channels';

// channels.open('updates')
channels.sadd(channelKey, 'updates');

//channels.publish
channels.publish('updates', { name: 'banana', info: 1117 });

// channels.close('updates')
channels.srem('redis-channels', 'updates', function() { console.log(arguments) });


var subscriber = redis.createClient();
//var subscriber = channels.createSubscriber('subscribe');
//var subscriber = channels.createSubscriber({ channel: 'subscribe', db: 8 });
//var subscriber = new Subscriber({ channel: 'subscribe', db: 8 });

// N/A
subscriber.subscribe('updates');
subscriber.on('updates', function(data, count) { console.log(arguments) });