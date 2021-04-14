'use strict';

/*eslint no-console:0*/

/**
 * Supply a warning to the developer that a method they are using
 * has been deprecated.
 * 警告开发者他们正在用的方法已被废弃
 * @param {string} method The name of the deprecated method  被废弃的方法名
 * @param {string} [instead] The alternate method to use if applicable  可替换的方法名
 * @param {string} [docs] The documentation URL to get further details  获取更多信息的链接
 */
module.exports = function deprecatedMethod(method, instead, docs) {
  try {
    console.warn(
      'DEPRECATED method `' + method + '`.' +
      (instead ? ' Use `' + instead + '` instead.' : '') +
      ' This method will be removed in a future release.');

    if (docs) {
      console.warn('For more information about usage see ' + docs);
    }
  } catch (e) { /* Ignore */ }
};
