import Mock from 'mockjs';

export default {
  /**
   * 基础选项
   */
  title: '游客类型',
  description: '游客类型',
  // dataUrl: '',
  // color: '',
  refreshTime: 60 * 1000, // 数据刷新时间
};
export const mockData = () => Mock.mock({
  code: '200',
  msg: '',
  status: 'OK',
  'data|3': [
    {
      'id|+1': 1,
      'type|+1': ['personal', 'student', 'team'],
      'number|+1': [10000, 3000, 7000],
      total: 20000,
    },
  ],
});
