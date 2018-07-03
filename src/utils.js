/**
 * Checks for an established connection.
 * @function
 * @throws {Error} Connection does not exists.
 */
export const hasClient = (client) => {
  if (client === undefined || null) {
    throw new Error('Connection undefined');
  }
};

/**
 * The allowed keys on the message object.
 * @constant {array}
 */
const MESSAGE_KEYS = ['id', 'title', 'type', 'description'];

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
