// 引入mockjs
import Mock from 'mockjs';

export default {
    /**
     * 基础选项
     */
    title: '船舶航行状态',
    description: '船舶航行状态',
    // dataUrl: '',
    // color: '',
    refreshTime: 30 * 60 * 1000, // 数据刷新时间
};
export const mockData = () => Mock.mock({
    code: '200',
    msg: '',
    status: 'OK',
    'data|30': [
        {
            'ship_no|1': ['WG8199','WJH001','WJH002','WY107','WY117','WY118','LGD','WY768'],
            'ship_status|1': ['岛内-岛外','岛外-岛内','航行中','岛外码头','岛内码头'],
        },
    ],
});