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
    , subscriber;

  channels.open('test2');
  subscriber = channels.subscribe('test2');

  subscriber.on('test2', function(data) {
    assert.eql(data, 'five');
  });

  channels.publish('test2', 'five');
  channels.close('test2')
};
