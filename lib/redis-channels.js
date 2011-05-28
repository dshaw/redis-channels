/*!
 * Redis Channels - dirt simple channels with redis
 * by @dshaw <3
 */

/**
 * Module Dependencies
 */

var redis = require('redis')
  , Subscriber = require('./subscriber');

/**
 * Exports
 */

exports.Channels = Channels;

exports.createChannels = function (options) {
  return new Channels(options);
};


/**
 * Utility Functions
 */

var noop = function () {};
/**
 * Channels
 *
 * @param {Object} options
 * @api public
 */

function Channels(options) {
  options || (options = {});
  this.key = options.key || 'redis-channels';
  this.client = redis.createClient(options.port, options.host, options);
  if (options.db) {
    var self = this;
    self.client.on('connect', function() {
      self.client.select = options.db;
    })
  }
}

/**
 * Open a Channel
 *
 * @param {String} name
 * @api public
 */

Channels.prototype.open = function (name) {
  this.client.sadd(this.key, name);
  return this;
};

/**
 * Publish data to a channel
 * 
 * @param {String} name
 * @param {Object} data
 */

Channels.prototype.publish = function (name, data) {
  this.client.publish(name, data);
  return this;
};

/**
 * Close a Channel
 *
 * @param {String} name
 * @param {Function} fn (optional)
 * @api public
 */

Channels.prototype.close = function (name, fn) {
  var self = this;
  this.client.srem(this.key, name, function() {
    //fn && fn.apply(self, arguments);
  });
  return this;
};

Channels.prototype.subscribe =
Channels.prototype.createSubscriber = function (options) {
  if (typeof options == 'string') {
    options = { name: options };
  }
  options || (options = {});
  options.channel = this;
  return new Subscriber(options);
};