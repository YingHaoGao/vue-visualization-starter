// 引入mockjs
import Mock from 'mockjs';

export default {
  /**
   * 基础选项
   */
  title: '气象预报',
  desc: '气象预报',
 // dataUrl: '',
 // color: '',
  refreshTime: 30 * 60 * 1000, // 数据刷新时间
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
  data: {
    date: '04月19日',
    week_day: '周五',
    lunar_date: '农历三月十五',
    temperature: '11',
    t_scope: '7~14',
    code: '9',
    text: '阴',
    text_day_night: '晴转多云',
    wind_direction: '东北',
    wind_scale: '4~5级',
    'quality|1': ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染'],
    'aqi|0-100': 55,
    'humidity|0-100': 50,
    'anion|10-30000': 19900,
    'sea_wave|0-500.2': 200.09,
    'tide|0-500.2': 277.79,
    last_update: '2018-03-27 07:28:00',
  },
});
