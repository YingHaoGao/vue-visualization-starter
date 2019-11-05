export default {
  /**
   * 不可变的格子数量
   * 不可添加删除
   */
  immutableGridNumber: true,
  gridNumber: 10,
  title: '大屏模板',
  description: '大屏模板',
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
