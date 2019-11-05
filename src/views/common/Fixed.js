export default {
  title: '固定布局模板',
  description: '模板描述',
  immutableGridNumber: false,
  options: {
    bgColor: {
      label: '背景颜色',
      type: 'color',
      default: '',
    },
    fixedWidth: {
      label: '固定宽度',
      type: 'number',
      default: 1920,
    },
    fixedHeight: {
      label: '固定高度',
      type: 'number',
      default: 1080,
    },
    minw: {
      label: '格子最小宽度',
      type: 'number',
      default: 50,
    },
    minh: {
      label: '格子最小高度',
      type: 'number',
      default: 50,
    },
    showGrid: {
      label: '显示网格',
      type: 'switch',
      default: false,
    },
    gridW: {
      label: '网格宽度',
      type: 'number',
      default: 50,
    },
    gridH: {
      label: '网格高度',
      type: 'number',
      default: 50,
    },
  },
};
