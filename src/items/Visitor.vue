<template>
    <div class="visitor">
        <div class="header">
            <h3>景区实时数据</h3>
        </div>
        <div class="header_bottom">
            <div class="left">
                <div class="left_icon"></div>
            </div>
            <div class="right">
                <div class="right_top">
                    <ul>
                        <li v-for="item in visitor.total">{{item}}</li>
                    </ul>
                </div>
                <h4 class="right_bottom">实时游客人数</h4>
            </div>
        </div>
        <div class="echart" ref="echart"></div>
    </div>
</template>

<script>
import itemMixin from '@/mixins/item';
import config, {initMockData, mockData} from './Visitor';

export default {
  name: 'Visitor',
  mixins: [itemMixin],
  config() {
    return config;
  },
  data() {
    return {
      visitor: {
        total: [], // 总游客数
        xAxisData: [], //  xAxis数据
        seriesBar: [],
        seriesLine: [],
        yAxisMax: 10000,
        yAxisMin: 1000,
        interval: 1800,
      },

    };
  },
  mounted() {
      this.onLoad();
      window.setInterval(() => {
          setTimeout(this.onLoad(), 0)
      }, 1800000)
  },
  methods: {
    createOption() {
      return {
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: this.visitor.xAxisData,
            // data:['刘公岛', '定远舰', '游览车', '环岛船', '索道双程', '潜水艇'],
            axisPointer: {
              type: 'shadow',
            },
            axisLabel: {
              color: '#f4f4f4',
              fontSize: 16,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '',
            max: this.visitor.yAxisMax,
            min: this.visitor.yAxisMin,
            interval: this.visitor.interval,
            splitNumber: 5,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: '#f4f4f4',
              fontSize: 14,
            },
          },
          // {
          //   type: 'value',
          //   name: '',
          //   min: 0,
          //   max: 100,
          //   splitNumber: 5,
          //   axisLabel: {
          //     formatter: '{value}%',
          //     color: '#f4f4f4',
          //     fontSize: 14,
          //   },
          //   axisLine: {
          //     show: false,
          //   },
          //   axisTick: {
          //     show: false,
          //   },
          // },
        ],
        series: [
          {
            name: '',
            type: 'bar',
            yAxisIndex: 0,
            data: this.visitor.seriesBar,
            itemStyle: {
              color: 'rgba(1,176,241, .5)',
            },
            label: {
              normal: {
                show: true,
                position: 'insideBottom',
                color: '#FFC000',
                fontSize: 16,
                distance: 0,
              },
            },
          },
          // {
          //   name: '',
          //   type: 'line',
          //   yAxisIndex: 1,
          //   data: this.visitor.seriesLine,
          //   itemStyle: {
          //     color: '#C2E59D',
          //   },
          //   label: {
          //     normal: {
          //       show: true,
          //       position: 'top',
          //       color: '#fff',
          //       fontSize: 16,
          //     },
          //     formatter: '{b|%}',
          //   },
          // },
        ],
      };
    },
    draw() {
        this.chart = echarts.init(this.$refs.echart);
        this.chart.clear();
        this.chart.setOption(this.createOption());
    },
    failCallback() {},
    alwaysCallback() {},
    onInit() {},
    /**
     * 初始化时加载
     */
    onLoad() {
        // 加载远程数据;
        if (this.isProd){
            this.$http.get('/api/visitor?area=客船&area=定远舰&area=游览车&area=环岛船&area=索道双程&area=潜水艇').then((res) => {
                if (res.data.code !== '200') return;
                let data = res.data.data;
                if (data.length > 0 && data.length < 6) {
                    let obj1 = data.find(v => v.name === '客船');
                    if(obj1 === undefined || obj1.length === 0){
                        obj1 ={
                            name: '客船',
                            number: 0,
                        }
                        data.push(obj1);
                    }
                    obj1 = data.find(v => v.name === '定远舰');
                    if(obj1 === undefined || obj1.length === 0){
                        obj1 ={
                            name: '定远舰',
                            number: 0,
                        }
                        data.push(obj1);
                    }
                    obj1 = data.find(v => v.name === '游览车');
                    if(obj1 === undefined || obj1.length === 0){
                        obj1 ={
                            name: '游览车',
                            number: 0,
                        }
                        data.push(obj1);
                    }
                    obj1 = data.find(v => v.name === '环岛船');
                    if(obj1 === undefined || obj1.length === 0){
                        obj1 ={
                            name: '环岛船',
                            number: 0,
                        }
                        data.push(obj1);
                    }
                    obj1 = data.find(v => v.name === '索道双程');
                    if(obj1 === undefined || obj1.length === 0){
                        obj1 ={
                            name: '索道双程',
                            number: 0,
                        }
                        data.push(obj1);
                    }
                    obj1 = data.find(v => v.name === '潜水艇');
                    if(obj1 === undefined || obj1.length === 0){
                        obj1 ={
                            name: '潜水艇',
                            number: 0,
                        }
                        data.push(obj1);
                    }
                }
                if (data.length === 6) {
                    this.visitor.total = (`${data[0].total}`).split('');
                    this.visitor.xAxisData = [];
                    this.visitor.seriesBar = [];
                    this.visitor.seriesLine = [];
                    data.forEach((item) => {
                        this.visitor.xAxisData.push(item.name==='客船'? '刘公岛': item.name);
                        this.visitor.seriesBar.push(item.number);
                        // this.visitor.seriesLine.push(((item.number / item.total) * 100).toFixed(2));
                    });
                    this.visitor.yAxisMax = Math.max.apply(null, this.visitor.seriesBar);
                    this.visitor.yAxisMax = Math.ceil(this.visitor.yAxisMax / 100) * 100;
                    this.visitor.yAxisMin = Math.min.apply(null, this.visitor.seriesBar);
                    this.visitor.yAxisMin = Math.floor(this.visitor.yAxisMin / 100) * 100;
                    this.visitor.interval = (this.visitor.yAxisMax - this.visitor.yAxisMin) / 5;

                }
                else{
                    const initRes = initMockData();
                    let initData = initRes.data;
                    this.visitor.total = (`${initData[0].total}`).split('');
                    this.visitor.xAxisData = [];
                    this.visitor.seriesBar = [];
                    this.visitor.seriesLine = [];
                    initData.forEach((item) => {
                        this.visitor.xAxisData.push(item.name==='客船'? '刘公岛': item.name);
                        this.visitor.seriesBar.push(item.number);
                    });
                    this.visitor.yAxisMax = 1000;
                    this.visitor.yAxisMin = 0;
                    this.visitor.interval = 200;
                }
                this.draw();
            })

        }else {
            const res = mockData();
            if (res.code !== '200') return;
            let data = res.data;
            if(data.length > 0 && data.length < 6){
                let obj1 = data.find(v => v.name === '客船');
                if(obj1 === undefined || obj1.length === 0){
                    obj1 ={
                        name: '客船',
                        number: 0,
                    }
                    data.push(obj1);
                }
                obj1 = data.find(v => v.name === '定远舰');
                if(obj1 === undefined || obj1.length === 0){
                    obj1 ={
                        name: '定远舰',
                        number: 0,
                    }
                    data.push(obj1);
                }
                obj1 = data.find(v => v.name === '游览车');
                if(obj1 === undefined || obj1.length === 0){
                    obj1 ={
                        name: '游览车',
                        number: 0,
                    }
                    data.push(obj1);
                }
                obj1 = data.find(v => v.name === '环岛船');
                if(obj1 === undefined || obj1.length === 0){
                    obj1 ={
                        name: '环岛船',
                        number: 0,
                    }
                    data.push(obj1);
                }
                obj1 = data.find(v => v.name === '索道双程');
                if(obj1 === undefined || obj1.length === 0){
                    obj1 ={
                        name: '索道双程',
                        number: 0,
                    }
                    data.push(obj1);
                }
                obj1 = data.find(v => v.name === '潜水艇');
                if(obj1 === undefined || obj1.length === 0){
                    obj1 ={
                        name: '潜水艇',
                        number: 0,
                    }
                    data.push(obj1);
                }
            }
            if(data.length === 6){
                this.visitor.total = (`${data[0].total}`).split('');
                this.visitor.xAxisData = [];
                this.visitor.seriesBar = [];
                this.visitor.seriesLine = [];
                data.forEach((item) => {
                    this.visitor.xAxisData.push(item.name==='客船'? '刘公岛': item.name);
                    this.visitor.seriesBar.push(item.number);
                    // this.visitor.seriesLine.push(((item.number / item.total) * 100).toFixed(2));
                });
                this.visitor.yAxisMax = Math.max.apply(null, this.visitor.seriesBar);
                this.visitor.yAxisMax = Math.ceil(this.visitor.yAxisMax / 100) * 100;
                this.visitor.yAxisMin = Math.min.apply(null, this.visitor.seriesBar);
                this.visitor.yAxisMin = Math.floor(this.visitor.yAxisMin / 100) * 100;
                this.visitor.interval = (this.visitor.yAxisMax - this.visitor.yAxisMin) / 5;
            }
            else{
                const initRes = initMockData();
                let initData = initRes.data;
                this.visitor.total = (`${initData[0].total}`).split('');
                this.visitor.xAxisData = [];
                this.visitor.seriesBar = [];
                this.visitor.seriesLine = [];
                initData.forEach((item) => {
                    this.visitor.xAxisData.push(item.name==='客船'? '刘公岛': item.name);
                    this.visitor.seriesBar.push(item.number);
                });
                this.visitor.yAxisMax = 1000;
                this.visitor.yAxisMin = 0;
                this.visitor.interval = 200;

            }
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
    .visitor{
        font-family: "Microsoft YaHei";
        height:100%;
        box-sizing: border-box;
        .header{
            color:#D5DAE4;
            height:5%;
            padding:10px;
            h3{
                border-left:2px solid  #D5DAE4;
                padding-left:5px;
            }
        }
        .header_bottom{
            height:15%;
            .left{
                float:left;
                width:10%;
                height:100%;
                padding:10px 15px;
                box-sizing: border-box;
                .left_icon{
                    width:100%;
                    height:100%;
                    background:url('../assets/images/visitor.png')  right  no-repeat;
                    background-size:contain;
                }
            }
            .right{
                /*color:#fff;*/
                color:#f4f4f4;
                float:left;
                width:90%;
                height:100%;
                border-left:1px solid #5B9BD5;
                box-sizing: border-box;
                .right_top{
                    height:65%;
                    border-bottom:1px solid #5B9BD5;
                    padding-right:20px;
                    box-sizing: border-box;
                    ul{
                        float:right;
                        height:100%;
                        li{
                            height:100%;
                            float:left;
                            background-color:#00B0F0;
                            border-radius:4px;
                            margin:0 2px;
                            padding:0 8px;
                            font-size:24px;
                            display:flex;
                            align-items:center;
                        }
                    }
                }
                .right_bottom{
                    height:35%;
                    padding-left:5px;
                    font-size:18px;
                }
            }
        }
        .echart{
            height:80%;
        }
    }
</style>
