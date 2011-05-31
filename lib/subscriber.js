/*!
 * Redis Channels Subscriber
 * by @dshaw <3
 */

/**
 * Module Dependencies
 */

var redis = require('redis')
  , events = require('events')
  , util = require('util');

/**
 * Exports
 */

module.exports = exports = Subscriber;

/**
 * Subscriber
 *
 * Each subscriber can subscribe to at most one channel.
 *
 * @param {Object} options
 * @api public
 */

function Subscriber(options) {
  options || (options = {});
  var self = this;
  self.channel = options.channel;
  self.client = redis.createClient(options.port, options.host, options);
  if (options.db) {
    self.client.on('connect', function() {
      self.client.db = options.db;
    })
  }
  if (options.name) {
    self.name = options.name;
    self.client.on('connect', function() {
      self.client.subscribe(self.name);
    })
  }

  // handle channel subscriptions
  self.client.on('message', function (channel, data) {
    var args = Array.prototype.slice.call(arguments, 0);
    // emit on the channel name
    self.emit.apply(self, args);
    // forward the node_redis emitter
    self.emit.apply(self, ['message'].concat(args));
  });
}

/**
 * Inherit from EventEmitter
 */

util.inherits(Subscriber, events.EventEmitter);


/**
 * Subscribe to a Channel
 *
 * @param {String} name
 * @api public
 */

Subscriber.prototype.subscribe = function (name) {
  this.name = name;
  this.client.subscribe(name);
  return this;
};
