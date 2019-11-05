export default {
  /**
   * 不可变的格子数量
   * 不可添加删除
   */
  immutableGridNumber: true,
  gridNumber: 9,
  title: '自定义模板二',
  description: '模板描述',
  options: {
    fixedWidth: {
      label: '固定宽度',
      type: 'number',
      default: 0,
    },
    maxWidth: {
      label: '最大宽度',
      type: 'number',
      default: 0,
    },
    minWidth: {
      label: '最小宽度',
      type: 'number',
      default: 0,
    },
  },
};
