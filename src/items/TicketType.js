import Mock from 'mockjs';

export default {
  /**
   * 基础选项
   */
  title: '售票方式',
  description: '售票方式',
 // dataUrl: '',
  // color: '',
  refreshTime: 60 * 1000, // 数据刷新时间
  /**
   * 动态组件选项
   * 提供更多可配置的选项
   * 不可与基础选项重名
   */
  options: {
  },
};
export const mockData = () => Mock.mock({
  code: '200',
  msg: '',
  status: 'OK',
  'data|2': [
    {
      'id|+1': 1,
      'type|+1': [0,1],
      'number|+1': [3000, 7000],
      total: 10000,
    },
  ],
});
