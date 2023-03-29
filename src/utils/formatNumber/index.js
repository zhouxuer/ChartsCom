/**
 * 数字千分位
 * @param val {Number, String}
 * @return {String}
 */

 export function ThousandSeparator(val) {
  if(!val) {
    return val;
  }
  if (val.toString().substr(0, 1) === '￥') {
    const vals = val.toString().replace('￥', '')
    return vals && '￥' + vals.toString()
      .replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  }
  return val && val.toString()
    .replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
/**
 * 数字是否超过一万
 * @param val {Number, String}
 * @return {String}
 */
export function isTenThousand(val, fix = 1) {
  const _val = Number(val)
  const res = (_val >= 10000) ? (_val / 10000).toFixed(fix) : _val.toFixed(1)

  return Number(res)
}
