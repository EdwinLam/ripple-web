module.exports = class StringUtil {
  static isNull (str) {
    return str == null || str === ''
  }
  /* 判断数组中是否有空 */
  static someNull (arr) {
    return arr.some(function (el) {
      return StringUtil.isNull(el)
    })
  }
}
