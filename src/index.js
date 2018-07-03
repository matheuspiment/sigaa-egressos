import * as emitter from 'emitter-io';

// Env for tests
const EMITTER_CHANNEL = 'news';
const EMITTER_CHANNEL_KEY = 'Yr2-O0G1QT3TQ70aPIwFeQk264wLw02n';

/**
 * The allowed keys on the message object.
 * @constant {array}
 */
const MESSAGE_KEYS = ['id', 'title', 'type', 'description'];

/**
 * An Emitter instance.
 * @global
 * @instance
*/
let client;

/**
 * Checks for an established connection.
 * @function
 * @throws {Error} Connection does not exists.
 */
const hasClient = () => {
  if (client === undefined || null) {
    throw new Error('Connection undefined');
  }
};

/**
 * Checks if the message is valid.
 * @function
 * @param {!object} message A javascript object
 * @throws {Error} The message must be an object.
 * @throws {Error} The message does not have all the expected keys.
 * @throws {Error} The message contains invalid keys.
 * @throws {Error} The value for the ${key} must be a number|string.
 */
export const checkMessage = (message) => {
  if (typeof message !== 'object') {
    throw new Error('The message must be an object');
  }

  const messageKeys = Object.keys(message);

  if (messageKeys.length < 4) {
    throw new Error('The message does not have all the expected keys');
  }

  const unMatchedKeys = messageKeys.filter(key => !MESSAGE_KEYS.includes(key));

  if (unMatchedKeys.length > 0) {
    throw new Error(`The message contains invalid keys:\n ${unMatchedKeys}`);
  }

  let value;

  MESSAGE_KEYS.forEach((key) => {
    value = message[key];

    if (key !== 'id') {
      if (typeof value !== 'string') {
        throw new Error(`The value for the ${key} must be a string`);
      }
    } else if (typeof value !== 'number') {
      throw new Error('The value for the id must be a number');
    }
  });
};

/**
 * Connects to the emitter api broker
 * and returns an Emitter instance.
 * @function
 */
const connect = () => {
  client = emitter.connect();
};

/**
 * Disconnects from the emitter broker.
 * @function
 */
const disconnect = () => {
  client.disconnect();
  client = undefined;
};

/**
 * Subscribes to the channel.
 * @function
 * @param {number} [last] Define how many stored messages you want to retrieve.
 * @throws {Error} The parameter last must be a number.
 */
const subscribe = (last) => {
  if (last !== undefined && typeof last !== 'number') {
    throw new Error('The parameter last must be a number');
  }

  hasClient();

  client.subscribe({
    key: EMITTER_CHANNEL_KEY,
    channel: EMITTER_CHANNEL,
    last: last === undefined ? 0 : last,
  });
};

/**
 * Unsubscribes to the channel.
 * @function
 */
const unsubscribe = () => {
  hasClient();

  client.unsubscribe({
    key: EMITTER_CHANNEL_KEY,
    channel: EMITTER_CHANNEL,
  });
};

/**
 * Publish a message to the channel.
 * @function
 * @param {!object} message A javascript object to publish.
 * @param {number} [ttl] Is the time-to-live of message, in seconds.
 * @throws {Error} The ttl parameter must be a number.
 */
const publish = (message, ttl) => {
  checkMessage(message);

  if (ttl !== undefined && typeof ttl !== 'number') {
    throw new Error('The ttl parameter must be a number');
  }

  hasClient();

  client.publish({
    key: EMITTER_CHANNEL_KEY,
    channel: EMITTER_CHANNEL,
    message: JSON.stringify(message),
    ttl: ttl === undefined ? 0 : ttl,
  });
};

/**
 * Define the callback for received message packet.
 * @function
 * @param {onMessageCallback} callback
 * @throws {Error} A callback function must be provided.
 * @throws {Error} The parameter is not a function.
 */
const onMessage = (callback) => {
  if (callback === undefined) {
    throw new Error('A function must be provided');
  }

  if (typeof callback !== 'function') {
    throw new Error('The parameter is not a function');
  }

  hasClient();

  client.on('message', (message) => {
    callback(message.asObject());
  });
};

export default {
  connect,
  disconnect,
  subscribe,
  unsubscribe,
  publish,
  onMessage,
};

/**
 * A callback function to treat the received messages
 * @callback onMessageCallback
 * @param {!object} message A javascript object.
 */
