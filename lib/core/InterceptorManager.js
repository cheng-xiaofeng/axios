'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 * 
 * 在栈中添加一个新的拦截器
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`   处理then方法的函数
 * @param {Function} rejected The function to handle `reject` for a `Promise`  处理reject方法的函数
 *
 * @return {Number} An ID used to remove interceptor later  用来移除拦截器的id
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 * 
 * 从栈中移除拦截器
 *
 * @param {Number} id The ID that was returned by `use`  上面的use方法返回的id
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors  迭代所有注册的拦截器
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * 这个方法在跳过已经是null的拦截器时,特别有用
 * 
 * @param {Function} fn The function to call for each interceptor  每个拦截器都被调用的函数
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {  // utils文件中的forEach方法, 参考axios源码(三)
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;
