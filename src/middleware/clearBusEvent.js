/* eslint no-underscore-dangle:0 */
const clearBusEvent = async ({ bus }) => {
  if (bus && bus._events) {
    bus.$off();
  }
  return true;
};

export default {
  before: clearBusEvent,
};
