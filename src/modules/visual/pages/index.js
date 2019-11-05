export default {
  name: 'VisualModule',
  middleware: ['checkPermission'],
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
    // const answer = window.confirm('确定要离开该模块？');
    // if (answer) {
    //   next();
    // } else {
    //   next(false);
    // }
  },
  render(createElement) {
    return createElement('router-view');
  },
};
