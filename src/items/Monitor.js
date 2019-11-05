// 引入mockjs
import Mock from 'mockjs';

export default {
  /**
   * 基础选项
   */
 // title: '性能实时监测',
 // desc: '性能实时监测',
  // dataUrl: '',
  // color: '',
  // refreshTime: 30 * 60 * 1000, // 数据刷新时间

};

export const sewageMockData = () => Mock.mock({
  code: '200',
  msg: '',
  status: 'OK',
  data: {
    'value|1-300': 100,
    'warn|1': false,
  },
});
export const wifiMockData = () => Mock.mock({
  code: '200',
  msg: '',
  status: 'OK',
  data: {
    'value|1-300': 100,
    'warn|1': false,
  },
});
export const networkMockData = () => Mock.mock({
  code: '200',
  msg: '',
  status: 'OK',
  data: {
    'value|1-300': 100,
    'warn|1': false,
  },
});
export const oceanMockData = () => Mock.mock({
  code: '200',
  msg: '',
  status: 'OK',
  data: {
    'value|1-300': 100,
    'warn|1': false,
  },
});
export const electricMockData = () => Mock.mock({
  code: '200',
  msg: '',
  status: 'OK',
  data: {
    'value|1-300': 100,
    'warn|1': false,
  },
});
export const weatherMockData = () => Mock.mock({
  code: '200',
  msg: '',
  status: 'OK',
  data: {
    'value|1-300': 100,
    'warn|1': false,
  },
});
export const applicationMockData = () => Mock.mock({
  code: '200',
  msg: '',
  status: 'OK',
  data: {
    'value|1-300': 100,
    'warn|1': false,
  },
});
export const forestMockData = () => Mock.mock({
  code: '200',
  msg: '',
  status: 'OK',
  data: {
    'value|1-300': 100,
    'warn|1': false,
  },
});

export const qualityMockData = () => Mock.mock({
  code: '200',
  msg: '',
  status: 'OK',
  data: {
    'value|1-300': 100,
    'warn|1': false,
  },
});

export const serverMockData = () => Mock.mock({
  code: '200',
  msg: '',
  status: 'OK',
  data: {
    'value|1-300': 100,
    'warn|1': false,
  },
});
