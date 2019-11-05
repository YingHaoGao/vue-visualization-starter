export default {
  title: '响应式模板',
  description: '模板描述',
  /**
   * 是否固定格子占位数量
   * 不可添加删除
   */
  immutableGridNumber: false,
  options: {
    bgColor: {
      label: '背景颜色',
      type: 'color',
      default: '',
    },
    colNum: {
      label: '列数',
      type: 'number',
      default: 12,
    },
    rowHeight: {
      label: '行高',
      type: 'number',
      default: 150,
    },
    maxRows: {
      label: '最大行数',
      type: 'number',
      default: 0,
      tips: '网格中的最大行数，0表示无限制',
    },
    margin: {
      label: '上下边距',
      type: 'number',
      default: [10, 10],
      tips: '格子边距',
    },
    fixedWidth: {
      label: '固定宽度',
      type: 'number',
      default: 0,
      min: 0,
    },
    maxWidth: {
      label: '最大宽度',
      type: 'number',
      default: 0,
      min: 0,
    },
    minWidth: {
      label: '最小宽度',
      type: 'number',
      default: 0,
      min: 0,
    },
    // responsive: {
    //   label: '响应式的',
    //   type: 'switch',
    //   default: true,
    //   tips: '容器大小变化时是否适应缩放格子',
    // },
    autoSize: {
      label: '自动调整高度',
      type: 'switch',
      default: true,
      tips: '容器大小变化时是否适应缩放格子',
    },
    verticalCompact: {
      label: '垂直紧凑',
      type: 'switch',
      default: true,
      tips: '是否应垂直紧凑',
    },

  },
};
