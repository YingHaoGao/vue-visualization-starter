/**
 * 接口封装
 */
import http from 'core/http';
import { isObject, isArray, isNumber, isString, replaceUrlPlaceholder, isExternal } from '../util';

const toMethod = options => (
  params = {},
  config = {},
) => {
  let { url } = options;
  if (!url) return Promise.reject();
  const defaultParams = options.params || null;
  const method = options.method || 'get';
  url = replaceUrlPlaceholder(url, (key) => {
    if (isNumber(params) || isString(params)) {
      return params;
    } else if (isObject(params)) {
      const val = params[key];
      if (val) {
        params[key] = undefined;
        return val;
      }
    }
    return key;
  });
  let data = {};
  if (params[''] && isArray(params[''])) {
    data = params[''];
  } else if (isObject(params)) {
    data = params;
  }
  if (defaultParams) {
    Object.keys(defaultParams).forEach((k) => {
      data[k] = defaultParams[k];
    });
  }
  if (isExternal(url)) {
    config.baseURL = url;
    url = '';
  }
  return ['post', 'put', 'patch'].indexOf(method) > -1 ? http[method](url, data, config) : http[method](url, Object.assign(config, { params: data }));
};

const toMethods = (actions) => {
  const facade = {};
  Object.keys(actions).forEach((key) => {
    facade[key] = toMethod(actions[key]);
  });
  return facade;
};

const generateApiMap = (map) => {
  const facade = {};
  Object.keys(map).forEach((key) => {
    facade[key] = !map[key].url ? toMethods(map[key]) : toMethod(map[key]);
  });
  return facade;
};

export default generateApiMap;
