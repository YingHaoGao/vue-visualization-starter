<template>
    <section class="echart-wrp">
        <div class="echart" ref="echart"></div>
    </section>
</template>

<script>
import itemMixin from '@/mixins/item';
import config, {initMockData, mockData} from './Volume';

export default {
  name: 'Volume',
  mixins: [itemMixin],
  config() {
    return config;
  },
  data() {
    return {
      volumeData: [],
    };
  },
  mounted() {
    this.onLoad();
      window.setInterval(() => {
          setTimeout(this.onLoad(),0)
      },2400000)
  },
  methods: {
    createOption() {
      const series = [];
      this.volumeData.forEach((item, index) => {
        let center,
          radius = '36%',
          fontSize = 14;
        if (index == 0) {
          center = ['50.5%', '70%']; // 左，上 ，默认全局居中
          radius = '56%';
          fontSize = 18;
        } else if (index == 1) {
          center = ['22%', '74%'];
        } else if (index == 2) {
          center = ['26%', '42%'];
        } else if (index == 3) {
          center = ['50.5%', '28%'];
        } else if (index == 4) {
          center = ['74%', '42%'];
        } else if (index == 5) {
          center = ['78%', '74%'];
        }
        const obj = {
          name: item.name,
          type: 'gauge',
          z: 3,
          radius,
          center, // 左，上 ，默认全局居中
          axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
              width: 8,
              color: [[item.threshold[0], '#92D14E'], [item.threshold[1], '#FEC100'], [item.threshold[2], '#ED7D31']], // TODO
            },
          },
          axisTick: { // 坐标轴小标记
            length: 8, // 属性length控制线长
            lineStyle: { // 属性lineStyle控制线条样式
              color: 'auto',
            },
          },
          splitLine: { // 分隔线
            length: 10, // 属性length控制线长
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
              color: 'auto',
            },
          },
          axisLabel: {
            distance: 2,
            // color: '#f4f4f4',
          },
          title: {
            offsetCenter: [0, '64%'],
            color: '#f4f4f4',
            fontSize,
          },
          pointer: {
            width: 2,
          },
          detail: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            formatter(value) {
              value = (`${value}`).split('.');
              value.length < 2 && (value.push('00'));
              return `${(`00${value[0]}`).slice(-2)
              }.${(`${value[1]}00`).slice(0, 2)}%`;
            },
            fontSize,
            color:'#f4f4f4'
          },
          data: [{ value: (item.current / item.total) * 100, name: item.name === '客船'? '刘公岛':item.name }],
        };
        series.push(obj);
      });
      return {
        series,
      };
    },
    draw() {
      this.$nextTick(() => {
        this.chart = echarts.init(this.$refs.echart);
        this.chart.setOption(this.createOption());
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
          this.$http.get('/api/volume?area=客船&area=定远舰&area=游览车&area=环岛船&area=索道双程&area=潜水艇').then((res) => {
              if (res.data.code !== '200') return;
              this.volumeData = res.data.data;
              if(this.volumeData.length === 0){
                    const resInit = initMockData();
                    this.volumeData = resInit.data;
              }
              if(this.volumeData.length > 0 && this.volumeData.length < 6){
                  let obj1 = this.volumeData.find(v => v.name === '客船');
                  if(obj1 === undefined || obj1.length === 0){
                      obj1 ={
                          name: '客船',
                          total: 1,
                          current: 0,
                          threshold: [0.3 , 0.7 , 1]
                      }
                      this.volumeData.push(obj1);
                  }
                  obj1 = this.volumeData.find(v => v.name === '定远舰');
                  if(obj1 === undefined || obj1.length === 0){
                      obj1 ={
                          name: '定远舰',
                          total: 1,
                          current: 0,
                          threshold: [0.3 , 0.7 , 1]
                      }
                      this.volumeData.push(obj1);
                  }
                  obj1 = this.volumeData.find(v => v.name === '游览车');
                  if(obj1 === undefined || obj1.length === 0){
                      obj1 ={
                          name: '游览车',
                          total: 1,
                          current: 0,
                          threshold: [0.3 , 0.7 , 1]
                      }
                      this.volumeData.push(obj1);
                  }
                  obj1 = this.volumeData.find(v => v.name === '环岛船');
                  if(obj1 === undefined || obj1.length === 0){
                      obj1 ={
                          name: '环岛船',
                          total: 1,
                          current: 0,
                          threshold: [0.3 , 0.7 , 1]
                      }
                      this.volumeData.push(obj1);
                  }
                  obj1 = this.volumeData.find(v => v.name === '索道双程');
                  if(obj1 === undefined || obj1.length === 0){
                      obj1 ={
                          name: '索道双程',
                          total: 1,
                          current: 0,
                          threshold: [0.3 , 0.7 , 1]
                      }
                      this.volumeData.push(obj1);
                  }
                  obj1 = this.volumeData.find(v => v.name === '潜水艇');
                  if(obj1 === undefined || obj1.length === 0){
                      obj1 ={
                          name: '潜水艇',
                          total: 1,
                          current: 0,
                          threshold: [0.3 , 0.7 , 1]
                      }
                      this.volumeData.push(obj1);
                  }
              }

              this.draw();
              console.log("仪表盘数据",this.volumeData);
          })
      } else {
      const res = mockData();
          if (res.code !== '200') return;
          this.volumeData = res.data;

          this.draw();
      }

    },
    onReload() {
      this.onLoad();
    },
    onResize() {
      this.chart.resize();
    },
    onNext() {},
    onPrev() {},
    onPrint() {},
  },
};
</script>
<style scoped lang="scss">
    .echart-wrp,.echart{
        height: 100%;
    }
</style>
