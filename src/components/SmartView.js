import views from '@/views';

export default {
  functional: true,
  props: {
    mode: {
      type: String,
      default: 'production',
    },
    config: {
      type: Object,
      default: {},
    },
  },
  render(createElement, { props }) {
    let {
      templateKey,
    } = props.config;
    if (templateKey && views) {
      templateKey = templateKey.toLowerCase();
      return createElement(
        views[templateKey],
        {
          props,
          ref: 'view',
        },
      );
    }
    return createElement('div', {
      class: 'lx-no-view',
    }, '没有找到视图模板');
  },
};
