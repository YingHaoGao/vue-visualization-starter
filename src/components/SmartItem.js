import items from '@/items';
import itemSkins from '@/itemSkins';
import SmartItemHandler from './SmartItemHandler.vue';

export default {
  functional: true,
  props: {
    config: {
      type: Object,
    },
    index: {
      type: Number,
    },
    mode: {
      type: String,
      default: 'production',
    },
  },
  render(createElement, context) {
    const {
      mode,
    } = context.props;
    const {
      componentKey,
      skin,
    } = context.props.config;
    let item = null;
    let itemHandler = null;
    if (componentKey && items[componentKey]) {
      item = createElement(
        items[componentKey],
        { props: context.props },
      );
    }
    if (item && skin && itemSkins[skin]) {
      item = createElement(itemSkins[skin], {
        props: context.props,
      }, [item]);
    }
    if (mode === 'production') {
      return item;
    } else if (mode === 'development') {
      return item;
    } else if (mode === 'editor') {
      itemHandler = createElement(SmartItemHandler, {
        props: context.props,
      });
      return [item, itemHandler];
    }
    return createElement('div', {
      class: 'lx-no-item',
    }, '请确认组件模式');
  },
};
