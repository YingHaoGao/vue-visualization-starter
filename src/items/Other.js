import Mock from 'mockjs';

export default {
  /**
   * 基础选项
   */
  title: '交易金额，交易数量，游客投诉，车辆',
  description: '交易金额，交易数量，游客投诉，车辆',
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
export const tradMocckData = () => Mock.mock({
  code: '200',
  msg: '',
  status: 'OK',
  data: {
    'money|1-20000': 10000,
    'number|1-5000': 5000,
  },
});
export const complainMocckData = () => Mock.mock({
  code: '200',
  msg: '',
  status: 'OK',
  data: 10,
});
export const carMocckData = () => Mock.mock({
  code: '200',
  msg: '',
  status: 'OK',
  data: {
    'free_parking|1-10000': 10000,
    'car_realtime|1-10000': 5000,
    'total|1-20000': 15000,
  },
});
