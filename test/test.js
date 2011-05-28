var assert = require('assert')
  , rc = require('../');

exports.channels = function () {
  var channels = rc.createChannels();

  assert.ok(channels);
  assert.ok(channels.open('test'));
  assert.ok(channels.publish('test', {}));
  assert.ok(channels.close('test'));
};

exports.subscribers = function () {
  var channels = rc.createChannels()
    , subscriber = channels.subscribe('updates');

  channels.open('test');
  subscriber.subscribe('test');

  channels.open('test');

  subscriber.on('test', function(data) {
    assert.eql(data, 'five');
  });

  channels.publish('test', 'five');
  channels.close('test')
};