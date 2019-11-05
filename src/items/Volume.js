// 引入mockjs
import Mock from 'mockjs';

export default {
  /**
   * 基础选项
   */
  title: '容量',
  description: '容量',
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
      'name|+1': ['客船', '定远舰', '博览园', '动物园', '索道', '陈列馆'],
      'total|10000-30000': 10000,
      'current|1-30000': 1000,
      threshold: [0.2 , 0.8 , 1]
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
      'total': 1,
      'current': 0,
      threshold: [0.2 , 0.8 , 1]
    },
  ],
});
