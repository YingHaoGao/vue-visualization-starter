/**
 * 滚动到顶部
 */
const scrollTop = () => {
  const el = window.document.querySelector('.lx-main');
  if (el) {
    setTimeout(() => {
      el.scrollTop = 0;
    }, 200);
  }
};
export default {
  after: scrollTop,
};
