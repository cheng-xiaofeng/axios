'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * 基于响应的状态resove或者reject一个promise
 * 
 * @param {Function} resolve A function that resolves the promise.  resolve的函数
 * @param {Function} reject A function that rejects the promise.  reject的函数
 * @param {object} response The response.  响应
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};
