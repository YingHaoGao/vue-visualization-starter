import Mock from 'mockjs';

export default {
  /**
   * 基础选项
   */
  title: '实时游客人数',
  description: '实时游客人数',
  // dataUrl: '',
  // color: '',
  refreshTime: 60 * 1000, // 数据刷新时间
};
export const mockData = () => Mock.mock({
  code: '200',
  msg: '',
  status: 'OK',
  'data|6': [
    {
      'id|+1': 1,
      'name|+1': ['客船', '定远舰', '游览车', '环岛船', '索道双程', '潜水艇'],
      'number|0-10000': 900,
      total: 10000,
    },
  ],
});
export const initMockData = () => Mock.mock({
  code: '200',
  msg: '',
  status: 'OK',
  'data|6': [
    {
      'id|+1': 1,
      'name|+1': ['客船', '定远舰', '游览车', '环岛船', '索道双程', '潜水艇'],
      'number': 0,
      total: 0,
    },
  ],
});
