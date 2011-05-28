Redis Channels

--------------
Dirt simple Redis-based channels.

--------------

*That sounds tasty!*
I thought so too.

API
--------------

var redisChannel = require('redis-channels');

var channel = redisChannel.createClient(/* options */);

channel.createChannel('updates'); // will create channel if it doesn't already exist. safe to call multiple times.

channel.new('updates');

channel.publish ('updates', { data: 'test' });

channel.createChannel('updates'); // will create channel if it doesn't already exist. safe to call multiple times.


channel.on('updates', function (update) { console.log(update) });

client.subscribe('updates');

client.on('updates', function (err, message, count) {
  if (err) throw

  console.log(message,);
  console.log('subscriber count', count);
});
