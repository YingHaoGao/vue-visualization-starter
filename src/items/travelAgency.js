// 引入mockjs
import Mock from 'mockjs';

export default {
  /**
   * 基础选项
   */
  title: '旅行社团队数量排行榜',
  description: '旅行社团队数量排行榜',
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
      'name|+1': '@cname()',
      'number|1-10000': 200,
      'percentage|1-100': 100,
      'rate|0-5.2': 3.5,
    },
  ],
});
