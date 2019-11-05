import { Base64 } from 'js-base64';
import { isObject } from './index';

export default (jwt) => {
  if (!jwt) return null;
  const jwtArr = jwt.split('.');
  if (!jwtArr[1]) return null;
  const payload = JSON.parse(Base64.decode(jwtArr[1]));
  if (!isObject(payload)) return null;
  return payload;
};
