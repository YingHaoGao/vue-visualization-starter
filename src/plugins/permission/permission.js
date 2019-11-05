import { isString, isArray, isFunction } from '@/util';

export default function install(store) {
  function check(action, strict = true) {
    if (isString(action)) {
      return store.state.permission.actions.indexOf(action) >= 0;
    } if (isFunction(action)) {
      return check(action(), strict);
    } else if (isArray(action)) {
      return action[strict ? 'every' : 'some'](code => store.state.permission.actions.indexOf(code) >= 0);
    }
    return false;
  }

  const handler = check;
  handler.check = check;
  handler.every = check;
  handler.some = actions => check(actions, false);
  handler.getAll = () => store.state.permission.actions;
  return handler;
}

