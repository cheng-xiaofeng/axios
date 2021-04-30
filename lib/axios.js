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
  // console.log('context',typeof context);
  var instance = bind(Axios.prototype.request, context); // 一个闭包,返回一个函数  第一个参数是方法,第二个是正常参数,调用instance时参数将传给Axios.prototype.request,将this指向context
                                                        // 也就是axios({}),我们传的对象传给了request
  // 将Axios.prototype的属性和属性值变成instance的属性和属性值  并返回instance
  utils.extend(instance, Axios.prototype, context);

  // 将context复制给实例
  utils.extend(instance, context);  //  将context的属性赋给instance,再将值通过bind给了instance

  return instance; // 是一个函数   axios({})就是instance({})
}

// 创建默认的实例
var axios = createInstance(defaults); // defaults一个大的对象. 各种配置

// 公开 Axios 类并允许类继承  axios已经是一个实例, 又添加了一个Axios属性,值是一个构造函数
axios.Axios = Axios;

// 添加一个工厂用来创建新的实例
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig)); // createInstance方法的返回值
};

// 公开 Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// 公开 all/spread
axios.all = function all(promises) {
  return Promise.all(promises); // Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
};
axios.spread = require('./helpers/spread');

// 公开 isAxiosError
axios.isAxiosError = require('./helpers/isAxiosError');

module.exports = axios;

// 允许使用模块化的default语法
module.exports.default = axios;
