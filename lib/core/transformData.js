'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 * 
 * 为请求或者响应改变数据
 *
 * @param {Object|String} data The data to be transformed  被改变的数据
 * @param {Array} headers The headers for the request or response   头部
 * @param {Array|Function} fns A single function or Array of functions 函数或者函数数组
 * @returns {*} The resulting transformed data  改变之后的data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};
