/* eslint no-param-reassign:0 */
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
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target);
export const isRegExp = isType('RegExp');
export const isArray = isType('Array');
export const isString = isType('String');
export const isObject = isType('Object');
export const isFunction = isType('Function');
export const isNumber = isType('Number');

export function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
/**
 * 移除数组项
 */
export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
  return arr;
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
export function isExternal(path) {
  return /^[a-z|A-Z]*:\/\//.test(path);
}

export const requestAnimFrame = (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function raf(callback) {
    return setTimeout(callback, 1000 / 60);
  }
);
export const cancelAnimFrame = (
  window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.msCancelAnimationFrame ||
  function raf(timer) {
    window.clearTimeout(timer);
  }
);
export const scrollToTop = (el, animation = false) => {
  if (!animation) {
    el.scrollTop = 0;
    return;
  }
  const anim = () => {
    if (el.scrollTop <= 0) return;
    el.scrollTop -= 30;
    requestAnimFrame(anim);
  };
  requestAnimFrame(anim);
};
export const recursionHandle = (data, handle) => data.map((item) => {
  if (item.children && item.children.length) {
    item.children = recursionHandle(item.children, handle);
    handle(item);
  } else {
    handle(item);
  }
  return item;
});
/**
 * 把字符串中的某一字符转换为其他字符
 */
export const exchange = (str, from = '/', to = '_', ignore = 'index') => {
  const strSplit = str.split(from);
  if (strSplit.length > 1) {
    if (strSplit[strSplit.length - 1].toLowerCase() === ignore) {
      strSplit.splice(strSplit.length - 1, 1);
      str = strSplit.join(to);
    } else {
      str = strSplit.join(to);
    }
  }
  return str;
};
export const gatherComponentConf = (component, key, keyName = 'componentKey') => {
  let { config = {} } = component;
  if (isFunction(config)) config = config();
  const { options } = config;
  if (options) {
    Object.keys(options).forEach((opt) => {
      if (typeof config[opt] !== 'undefined') return;
      if (options[opt] && typeof options[opt].default !== 'undefined') {
        config[opt] = options[opt].default;
      }
    });
  }
  config[keyName] = key;
  return config;
};

export function replacePlaceholder(str = '', pattern, handleCallback) {
  return str.replace(pattern, (v) => {
    const key = v.slice(1);
    return handleCallback(key);
  });
}
export function replaceUrlPlaceholder(url, handleCallback) {
  return replacePlaceholder(url, /:[a-zA-Z]+/g, handleCallback);
}
