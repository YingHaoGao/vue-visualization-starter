import Mock from 'mockjs';

export default {
  /**
   * 基础选项
   */
  title: '人群密度（刘公岛热力图）',
  description: '人群密度（刘公岛热力图）',
  // dataUrl: '',
  // color: '#6e6e6e',
  refreshTime: 60 * 1000, // 数据刷新时间
};
export const mockData = () => Mock.mock({
  code: 200,
  msg: '',
  status: 'OK',
  'data|6': [
    {
      'id|+1': 1,
      'name|+1': ['刘公岛', '定远舰', '游览车', '环岛', '索道', '潜水艇'],
      'number|0-1000': 900,
      total: 20000,
    },
  ],
});
