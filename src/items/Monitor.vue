<template>
    <div class="monitor">
    <div class="monitor-wrapper">
        <div class="header">
            <h3>性能实时监测</h3>
        </div>
        <ul class="container">
            <li>
                <span>W&nbsp;&nbsp;I&nbsp;&nbsp;F&nbsp;&nbsp;I</span>
                <span>{{wifi.value}}</span>
                <span :class="wifi.warn?'red':'green'"></span>
            </li>

            <li>
                <span>网络预警</span>
                <span>{{network.value}}</span>
                <span :class="network.warn?'red':'green'"></span>
            </li>
            <li>
                <span>电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;力</span>
                <span>{{electric.value}}</span>
                <span :class="electric.warn?'red':'green'"></span>
            </li>
            <li>
                <span>应用系统</span>
                <span>{{application.value}}</span>
                <span :class="application.warn?'red':'green'"></span>
            </li>
            <li>
                <span>服&nbsp;&nbsp;务&nbsp;&nbsp;器</span>
                <span>{{server.value}}</span>
                <span :class="server.warn?'red':'green'"></span>
            </li>
        </ul>
    </div>

    <div class="monitor-wrapper">
        <div class="header">
            <h3>环境实时监测</h3>
        </div>
        <ul class="container">
            <li>
                <span>森林防火</span>
                <span>{{forest.value}}</span>
                <span :class="forest.warn?'red':'green'"></span>
            </li>
            <li>
                <span>气象预警</span>
                <span>{{weather.value}}</span>
                <span :class="weather.warn?'red':'green'"></span>
            </li>

            <li>
                <span>空气质量</span>
                <span>{{quality.value}}</span>
                <span :class="quality.warn?'red':'green'"></span>
            </li>

            <li>
                <span>污&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;水</span>
                <span>{{sewage.value}}</span>
                <span :class="sewage.warn?'red':'green'"></span>
            </li>
            <li>
                <span>海洋水质</span>
                <span>{{ocean.value}}</span>
                <span :class="ocean.warn?'red':'green'"></span>
            </li>
        </ul>
    </div>
    </div>
</template>

<script>
import itemMixin from '@/mixins/item';
import config, {
    applicationMockData,
    electricMockData, forestMockData,
    networkMockData,
    oceanMockData, qualityMockData, serverMockData,
    sewageMockData,
    weatherMockData, wifiMockData
} from './Monitor';

export default {
  name: 'Monitor',
  mixins: [itemMixin],
  config() {
    return config;
  },
  data() {
    return {
      wifi: {},
      // 污水
      sewage: {},
      network: {},
      ocean: {},
      electric: {},
      weather: {},
      application: {},
      forest: {},
      server: {},
      quality:{}
    };
  },
  mounted() {
    this.onLoad();
      window.setInterval(() => {
          setTimeout(this.onLoad(),0)
      },3600000)
  },
  methods: {
    draw() {},
    failCallback() {},
    alwaysCallback() {},
    onInit() {},
    /**
     * 初始化时加载
     */
     onLoad() {
      if (this.isProd) {
        // 加载远程数据
            this.$http.get('/api/warn', {params: { type: 'wifi' }}).then((wifiRes) => {
                if (wifiRes.data.code !== '200') return;
                this.wifi = wifiRes.data.data;
            })

          this.$http.get('/api/warn', {params: { type: 'sewage' }}).then((sewageRes) => {
              if (sewageRes.data.code !== '200') return;
              this.sewage = sewageRes.data.data;
          })

          this.$http.get('/api/warn', {params: { type: 'network' }}).then((networkRes) => {
              if (networkRes.data.code !== '200') return;
              this.network = networkRes.data.data;
          })

          this.$http.get('/api/warn', {params: { type: 'ocean' }}).then((oceanRes) => {
              if (oceanRes.data.code !== '200') return;
              this.ocean = oceanRes.data.data;
          })

          this.$http.get('/api/warn', {params: { type: 'electric' }}).then((electricRes) => {
              if (electricRes.data.code !== '200') return;
              this.electric = electricRes.data.data;
          })

          this.$http.get('/api/warn', {params: { type: 'weather' }}).then((weatherRes) => {
              if (weatherRes.data.code !== '200') return;
              this.weather = weatherRes.data.data;
          })

          try{
              this.$http.get('/api/warn', {params: { type: 'application' }}).then((applicationRes) => {
                  if (applicationRes.data.code !== '200') return;
                  this.application = applicationRes.data.data;
              })
          }
          catch(err){
                console.error("application 接口err",err);
          }

          this.$http.get('/api/warn', {params: { type: 'forest' }}).then((forestRes) => {
              if (forestRes.data.code !== '200') return;
              this.forest = forestRes.data.data;
          })

          this.$http.get('/api/warn', {params: { type: 'server' }}).then((serverRes) => {
              // console.log("server:",serverRes);
              if (serverRes.data.code !== '200') return;
              this.server = serverRes.data.data;
          })

          this.$http.get('/api/warn', {params: { type: 'quality' }}).then((qualityRes) => {
              if (qualityRes.data.code !== '200') return;
              this.quality = qualityRes.data.data;
          })

      } else {
          const wifiRes = wifiMockData();
          if(wifiRes.code !== '200') return;
          this.wifi = wifiRes.data;

          const sewageRes = sewageMockData();
          if(sewageRes.code !== '200') return;
          this.sewage = sewageRes.data;

          const networkRes = networkMockData();
          if(networkRes.code !== '200') return;
          this.network = networkRes.data;

          const oceanRes = oceanMockData();
          if(oceanRes.code !== '200') return;
          this.ocean = oceanRes.data;

          const electricRes = electricMockData();
          if(electricRes.code !== '200') return;
          this.electric = electricRes.data;

          const weatherRes = weatherMockData();
          if(weatherRes.code !== '200') return;
          this.weather = weatherRes.data;

          const applicationRes = applicationMockData();
          if(applicationRes.code !== '200') return;
          this.application = applicationRes.data;

          const forestRes = forestMockData();
          if(forestRes.code !== '200') return;
          this.forest = forestRes.data;

          const serverRes = serverMockData();
          if(serverRes.code !== '200') return;
          this.server = serverRes.data;

          const qualityRes = qualityMockData();
          if(qualityRes.code !== '200') return;
          this.quality = qualityRes.data;
      }
    },
    onReload() {
      this.onLoad();
    },
    onResize() {},
    onNext() {},
    onPrev() {},
    onPrint() {},
  },
};
</script>

<style scoped lang="scss">
    .monitor{
        width: 100%;
        height: 100%;
    }
    .monitor-wrapper{
        float: left;
        width:50%;
        height: 100%;
        font-family: "Microsoft YaHei";
        .header{
            height:12%;
            width: 100%;
            margin:0 2%;
            display: flex;
            align-items: center;
            color:#D5DAE4;
            h3{
                border-left:2px solid  #D5DAE4;
                padding-left:10px;
            }
        }
        .container{
            height:88%;
            width: 100%;
            font-size:18px;
            color:#f4f4f4;
            li{

                float:left;
                height: 17%;
                display:flex;
                align-items: center;
                box-sizing: border-box;
                padding-left:15px;
                span{
                    margin:0 20px;
                    &:nth-child(1){
                        width:80px;
                    }
                    &:nth-child(2){
                        width:40px;
                        color:#FFC000;
                    }
                }
            }
            .red{
               width:20px;
                height:20px;
                border-radius:50%;
                background-color:#FF3434;
                border:1px solid #FF3434;
                box-shadow: 0 0 5px #757575;
            }
            .green{
                width:20px;
                height:20px;
                border-radius:50%;
                background-color:#91CF50;
                border:1px solid #91CF50;
                box-shadow: 0 0 5px #757575;
            }
        }
    }
</style>
