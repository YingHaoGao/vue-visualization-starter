const toStr = Object.prototype.toString;
export function isUndef(v) {
  return v === undefined || v === null;
}
export function isDef(v) {
  return v !== undefined && v !== null;
}
export function isTrue(v) {
  return v === true;
}
export function isFalse(v) {
  return v === false;
}
export function isRegExp(v) {
  return toStr.call(v) === '[object RegExp]';
}
export function isArray(v) {
  return toStr.call(v) === '[object Array]';
}
export function isString(v) {
  return toStr.call(v) === '[object String]';
}
export function isObject(v) {
  return toStr.call(v) === '[object Object]';
}
export function isFunction(v) {
  return toStr.call(v) === '[object Function]';
}
export function isNumber(v) {
  return toStr.call(v) === '[object Number]';
}
export function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function capitalizeFirstLetter(string) {
  return string.charAt(0) + string.slice(1);
}
export function requireContext(rContext, handle) {
  rContext.keys().forEach((key) => {
    const context = rContext(key);
    // 因为得到的file格式是: `./filename.js`, 所以这里我们去掉头和尾，只保留真正的文件名: `filename`
    const name = capitalizeFirstLetter(key.replace(/^\.\//, '').replace(/\.\w+$/, ''));
    if (handle) handle(name, context);
  });
}
