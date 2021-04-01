'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * 创建axios实例
 *
 * @param {Object} defaultConfig 实例的默认配置
 * @return {Axios} 返回一个新的实例
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig); // axios的构造函数的实例
  var instance = bind(Axios.prototype.request, context); // 一个闭包  第一个参数是方法,第二个是正常参数,调用instance时参数将传给Axios.prototype.request,将this指向context

  // 将Axios.prototype复制给实例
  utils.extend(instance, Axios.prototype, context);

  // 将context复制给实例
  utils.extend(instance, context);

  return instance;
}

// 创建默认的实例
var axios = createInstance(defaults); // defaults一个大的对象. 各种配置

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// Expose isAxiosError
axios.isAxiosError = require('./helpers/isAxiosError');
console.log(axios);
module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;
