<template>
    <section class="heatMap">
        <div id="heatMap" class="echart" ref = "echart"></div>
    </section>
</template>

<script>
import itemMixin from '@/mixins/item';
import config, { mockData } from './HeatMap';

export default {
  name: 'HeatMap',
  mixins: [itemMixin],
  config() {
    return config;
  },
  data() {
    return {
      data: {},
    };
  },
  mounted() {
      this.onLoad();
      window.setInterval(() => {
          setTimeout(this.onLoad(),0)
      },3000000)
  },
  methods: {
      drawMap () {
          const json = require('./liugongdao.json')
          echarts.registerMap('liugongdao', json, {})
          this.myChart.setOption({
             // backgroundColor: this.config.color,
              visualMap: { // 热力图颜色显示
                  show: false,
                  min: 0,
                  max: 5,
                  seriesIndex: 0,
                  calculable: true,
                  inRange: {
                      color: ['blue', 'green', 'yellow', 'red']
                  }
              },
              geo: [{ // 地图
                  type: 'map',
                  map: 'liugongdao', // 地区名字，重要参数
                  itemStyle: {
                      areaColor: '#b3ed99',
                      borderColor: '#dcee7b'
                  },
                  emphasis: {
                      label: {
                          show: false
                      },
                      itemStyle: {
                          areaColor: '#9cdf7e'
                      }
                  },
                  label: { // 标签的显示
                      normal: {
                          show: true,
                          textStyle: { // 标签的字体样式
                              color: '#000', // 字体颜色
                              fontWeight: 'bolder', // 'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                              fontFamily: 'Microsoft Yahei', // 文字的字体系列
                              fontSize: 18 // 字体大小
                          }
                      },
                      emphasis: {show: true}
                  }
              }],
              series: [{ // 热力分布
                  mapType: 'liugongdao',
                  roam: true,
                  type: 'heatmap',
                  coordinateSystem: 'geo',
                  data: this.data,
                  //data:,
                  pointSize: 15,
                  blurSize: 10,
                  minOpacity: 0.1,
                  maxOpacity: 1,
              },
              {// 散点分布
                  name: 'dot',
                  type: 'scatter',
                  coordinateSystem: 'geo',
                  symbol: 'pin',
                  symbolSize: function (val) {
                      return val[2] * 8;
                  },
                  label: {
                      normal: {
                          show: true,
                          position: 'bottom',
                          formatter: function (params) { // 标签显示文字
                              return params.data.name
                          },
                          textStyle: {
                              color: '#000',
                              fontSize: 12,
                              fontWeight: 'bold'
                          }
                      }
                  },
                  itemStyle: {
                      normal: {
                          color: '#0393ef', //气泡颜色
                      }
                  },
                  data: [
                      {name: '倒水涧', value: ['122.17423439025877', '37.506900253948835', 2]},
                      {name: '西村', value: ['122.17324733734131', '37.50288296741548', 2]},
                      {name: '刘公岛国家森林公园', value: ['122.18045711517334', '37.50145303360404', 5]},
                      {name: '迎门洞炮台', value: ['122.19247341156004', '37.50669599035854', 4]},
                      {name: '黄岛炮台', value: ['122.16423511505126', '37.50523208493878', 2]},
                      {name: '刘公岛索道站', value: ['122.18320369720459', '37.50666194637248', 4]},
                      {name: '冲龟石', value: ['122.18423366546631', '37.50901094498736', 2]},
                      {name: '高尔夫博物馆', value: ['122.18921184539794', '37.5013849408347', 2]}
                  ]
              }
              ]
          })
      },
      draw() {
          this.$nextTick(() => {
              this.myChart = echarts.init(document.getElementById('heatMap'));
              this.drawMap();
          });
      },
    failCallback() {},
    alwaysCallback() {},
    onInit() {},
  /**
   * 初始化时加载
   */
   onLoad() {
      if (this.isProd) {
        // 加载远程数据
          try{
              this.$http.get('/api/crowdDensity?area=刘公岛国家森林公园&area=刘公岛索道站&area=高尔夫博物馆').then((res) => {
                  if (res.data.code !== '200') return;
                  this.data = res.data.data;
              })
          }
          catch(err){
                console.error(err);
          }
          finally {
              this.draw();
          }
      } else {
      this.data = [
          // {name: '倒水涧', value: ['122.17423439025877', '37.506900253948835', 2]},
          // {name: '西村', value: ['122.17324733734131', '37.50288296741548', 1]},
          {name: '刘公岛国家森林公园', value: ['122.18045711517334', '37.50145303360404', 5]},
          // {name: '迎门洞炮台', value: ['122.19247341156004', '37.50669599035854', 4]},
          // {name: '黄岛炮台', value: ['122.16423511505126', '37.50523208493878', 2]},
          {name: '刘公岛索道站', value: ['122.18320369720459', '37.50666194637248', 5]},
          // {name: '冲龟石', value: ['122.18423366546631', '37.50901094498736', 3]},
          {name: '高尔夫博物馆', value: ['122.18921184539794', '37.5013849408347', 3]}
      ];
      this.draw();
      }

  },
    onReload() {
      this.onLoad();
    },
    onResize() {
      this.myChart.resize();
    },
    onNext() {},
    onPrev() {},
    onPrint() {},
  },
};
</script>

<style scoped>
    .heatMap,.echart{
        height:100%;
    }
</style>
