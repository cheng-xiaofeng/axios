'use strict';

/**
 * Determines whether the specified URL is absolute  确定一个url是不是绝对url
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).  如果是://或者//开头,就是绝对url
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed  rfc 3986定义组合名是一系列字符,由字母开始,后面跟着字母,数字,加号,-,点的组合
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};
