// 引入mockjs
import Mock from 'mockjs';

export default {
  /**
   * 基础选项
   */
  title: '客源地排行榜',
  description: '客源地排行榜',
  // dataUrl: '',
  // color: '',
  refreshTime: 30 * 60 * 1000, // 数据刷新时间
};
export const mockData = () => Mock.mock({
  code: '200',
  msg: '',
  status: 'OK',
  'data|10': [
    {
      'id|+1': 1,
      'province|+1': '@province()',
      'number|1-20000': 1000,
      'percentage|1-100': 100,
    },
  ],
});
