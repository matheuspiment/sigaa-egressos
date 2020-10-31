import * as emitter from 'emitter-io';
import { hasClient, checkMessage } from './utils';

/**
 * An Emitter instance.
 * @global
 * @instance
*/
let client;

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
 *
 * @function
 *
 * @param {string} [credentials.key] Channel key.
 * @param {string} [credentials.channel] Channel name.
 * @param {number} [last] Define how many stored messages you want to retrieve.
 *
 * @throws {TypeError} `credentials.key` must be a string.
 * @throws {TypeError} `credentials.channel` must be a string.
 * @throws {TypeError} `last` must be a number.
 */
const subscribe = (credentials, last) => {
  if (credentials && typeof credentials.key !== 'string') {
    throw new TypeError('The parameter credentials.key must be a string');
  }

  if (credentials && typeof credentials.channel !== 'string') {
    throw new TypeError('The parameter credentials.channel must be a string');
  }

  if (last !== undefined && typeof last !== 'number') {
    throw new TypeError('The parameter last must be a number');
  }

  hasClient(client);

  client.subscribe({
    key: credentials.key,
    channel: credentials.channel,
    last: last === undefined ? 0 : last,
  });
};

/**
 * Unsubscribes to the channel.
 *
 * @function
 *
 * @param {string} [credentials.key] Channel key.
 * @param {string} [credentials.channel] Channel name.
 *
 * @throws {TypeError} `credentials.key` must be a string.
 * @throws {TypeError} `credentials.channel` must be a string.
 */
const unsubscribe = (credentials) => {
  if (credentials && typeof credentials.key !== 'string') {
    throw new TypeError('The parameter credentials.key must be a string');
  }

  if (credentials && typeof credentials.channel !== 'string') {
    throw new TypeError('The parameter credentials.channel must be a string');
  }

  hasClient(client);

  client.unsubscribe({
    key: credentials.key,
    channel: credentials.channel,
  });
};

/**
 * Publish a message to the channel.
 *
 * @function
 *
 * @param {string} [credentials.key] Channel key.
 * @param {string} [credentials.channel] Channel name.
 * @param {!object} message A javascript object to publish.
 * @param {number} [ttl] Is the time-to-live of message, in seconds.
 *
 * @throws {TypeError} `credentials.key` must be a string.
 * @throws {TypeError} `credentials.channel` must be a string.
 * @throws {TypeError} `last` must be a number.
 */
const publish = (credentials, message, ttl) => {
  if (credentials && typeof credentials.key !== 'string') {
    throw new TypeError('The parameter credentials.key must be a string');
  }

  if (credentials && typeof credentials.channel !== 'string') {
    throw new TypeError('The parameter credentials.channel must be a string');
  }

  checkMessage(message);

  if (ttl !== undefined && typeof ttl !== 'number') {
    throw new TypeError('The ttl parameter must be a number');
  }

  hasClient(client);

  client.publish({
    key: credentials.key,
    channel: credentials.channel,
    message: JSON.stringify(message),
    ttl: ttl === undefined ? 0 : ttl,
  });
};

/**
 * Define the callback for received message packet.
 *
 * @function
 *
 * @param {onMessageCallback} callback
 *
 * @throws {TypeError} A callback function must be provided.
 */
const onMessage = (callback) => {
  if (typeof callback !== 'function') {
    throw new TypeError('A function must be provided');
  }

  hasClient(client);

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
