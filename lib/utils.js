'use strict';

var bind = require('./helpers/bind');

// 一个公共函数库,并不特定只能axios使用

var toString = Object.prototype.toString;

/**
 * 判断一个值是不是数组
 *
 * @param {Object} val 要检测的值
 * @returns {boolean} 是数组返回true 不是返回false
 * 
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * 判断一个值是不是undefined
 *
 * @param {Object} val 要检测的值
 * @returns {boolean} 是数组返回true 不是返回false
 * 
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * 判断一个值是不是buffer
 *
 * @param {Object} val 要检测的值
 * @returns {boolean} 是数组返回true 不是返回false
 * 
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * 判断一个值是不是 arrayBuffer
 *
 * @param {Object} val 要检测的值
 * @returns {boolean} 是数组返回true 不是返回false
 * 
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * 判断一个值是不是 FormData
 *
 * @param {Object} val 要检测的值
 * @returns {boolean} 是数组返回true 不是返回false
 * 
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * 判断传入的参数值是否是一种 ArrayBuffer 视图（view）
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * 判断一个值是不是 string
 *
 * @param {Object} val 要检测的值
 * @returns {boolean} 是数组返回true 不是返回false
 * 
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * 判断一个值是不是 number
 *
 * @param {Object} val 要检测的值
 * @returns {boolean} 是数组返回true 不是返回false
 * 
 */

/**
 * 判断一个值是不是 object
 *
 * @param {Object} val 要检测的值
 * @returns {boolean} 是数组返回true 不是返回false
 * 
 */

function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * 判断一个值是不是 plain object
 *
 * @param {Object} val 要检测的值
 * @returns {boolean} 是数组返回true 不是返回false
 * 
 */

function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * 判断一个值是不是 date
 *
 * @param {Object} val 要检测的值
 * @returns {boolean} 是数组返回true 不是返回false
 * 
 */

function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * 判断一个值是不是 File
 *
 * @param {Object} val 要检测的值
 * @returns {boolean} 是数组返回true 不是返回false
 * 
 */

function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * 判断一个值是不是 blob
 *
 * @param {Object} val 要检测的值
 * @returns {boolean} 是数组返回true 不是返回false
 * 
 */

function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * 判断一个值是不是 function
 *
 * @param {Object} val 要检测的值
 * @returns {boolean} 是数组返回true 不是返回false
 * 
 */


/**
 * 判断一个值是不是 stream
 *
 * @param {Object} val 要检测的值
 * @returns {boolean} 是数组返回true 不是返回false
 * 
 */


/**
 * 判断一个值是不是 URLSearchParams
 *
 * @param {Object} val 要检测的值
 * @returns {boolean} 是数组返回true 不是返回false
 * 
 */

function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * 删除字符串前面和后面的空格
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * 判断是不是运行在一个标准的浏览器环境
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
    navigator.product === 'NativeScript' ||
    navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * 迭代一个数组或者对象,为每个元素都触发一个函数.
 *
 * 如果obj是一个数组, 回调函数会被调用,参数是数组的
 * 每一个元素,下标和整个数组
 *
 * 如果obj是一个对象,回调函数会被调用,参数是对象的
 * 值,键和整个对象
 *
 * @param {Object|Array} obj 可 iterate的对象
 * @param {Function} fn 回调函数
 */
function forEach(obj, fn) {
  // 什么都没有
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // 如果不是数组,强制变成数组
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // 迭代数组的值
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // 迭代数组的键
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * 接收可变参数,希望每个参数都是个对象, 
 * 然后合并每个对象的属性并返回结果.
 *
 * 当有几个对象拥有相同的属性时,后者会覆盖前者
 *
 * 例如:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 要合并的对象
 * @returns {Object} 合并属性以后的结果
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * 对象b的属性添加到对象a上.
 *
 * @param {Object} a 对象a
 * @param {Object} b 要复制属性的对象b
 * @param {Object} thisArg this指向
 * @return {Object} 对象a的结果值
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg); // 调用a[key]这个方法是,参数会传给val  相当于是val.apply(thisArg, args)
    } else {
      a[key] = val;
    }
  });
  return a;
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
 function isNumber(val) {
  return typeof val === 'number';
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
 function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
 function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}


/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 * 去除BOM
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};
