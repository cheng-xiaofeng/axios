'use strict';

/**
 * Determines whether the payload is an error thrown by Axios  确定是不是axios抛出的错误
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};
