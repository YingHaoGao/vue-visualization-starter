<template>
    <div class="tourists">
        <div class="header">
            <h3>客源地排行榜</h3>
        </div>
        <table class="tableData" cellpadding="0" cellspacing="0">
            <thead>
            <tr>
                <th class="ranking">排名</th>
                <th class="province">客源地</th>
                <th class="number">游客人数（万）</th>
                <th class="percentage">占比</th>
            </tr>
            </thead>
            <tbody>
            <tr v-show="tableData.length > 0" v-for="(item,index) in tableData" v-if="index<5">
                <td class="ranking">{{index+1}}</td>
                <td class="province">{{item.province}}</td>
                <td class="number">{{item.number/10000}}</td>
                <td class="percentage">
                    <span>{{item.percentage}}%</span>
                    <el-progress class="progress" style="float:right;width:80%" :show-text="false" :stroke-width="14" :percentage="item.percentage" color="#FDC401"></el-progress>
                </td>
            </tr>
            <tr v-show="tableData.length === 0">
                <td class="row-block" colspan="4" align="center">数据采集中</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import itemMixin from '@/mixins/item';
import config, { mockData } from './TouristsSource';
export default {
  name: 'TouristsSource',
  mixins: [itemMixin],
  config() {
    return config;
  },
  data() {
    return {
      tableData: [],
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
          this.$http.get('/api/touristsSource').then((res) => {
              if (res.data.code !== '200') return;
              this.tableData = res.data.data;
              console.log('客源数据', this.tableData);
          })
      } else {
        const res = mockData();
        if (res.code !== '200') return;
        this.tableData = res.data;
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

<style lang="scss">
    .tourists {
        .el-progress-bar__outer {
            background-color: #5B9AD2;
        }
    }
</style>
<style scoped lang="scss">
    .tourists {
        font-family: "Microsoft YaHei";
        height: 100%;
        color:#D5DAE4;
        .header{
            height:12%;
            width:96%;
            margin:0 2%;
            display: flex;
            align-items: center;
            h3{
                border-left:2px solid  #D5DAE4;
                padding-left:10px;
            }
        }
        .tableData{
            width:100%;
            text-align: center;
            /*height:88%;*/
            border:1px solid  rgba(255,255,255,.4);
            font-size:16px;
            color:#f4f4f4;
            th,tr{
                width:100%;
                height:8%;
            }
            thead{
                tr{
                    th{
                        height: 36px;
                        border-bottom: 1px solid rgba(255,255,255,.4);
                        border-left: 1px solid rgba(255,255,255,.4);
                    }
                    th:first-child{
                        border-left: none;
                    }
                }
            }
            tbody{
                tr:nth-child(2n){
                    /*background-color:rgba(226,239,218,0.5);*/
                    /*background-color:rgba(112,173,71,0.5);*/
                }
                tr{
                    td{
                        height: 50px;
                        border-bottom: 1px solid rgba(255,255,255,.4);
                        border-left: 1px solid rgba(255,255,255,.4);
                    }
                    td:first-child{
                        border-left: none;
                    }
                    .row-block{
                        height: 250px;
                    }
                }
                tr:last-child{
                    td{
                        border-bottom: none;
                    }
                }
            }
            .ranking{
                width:10%;
            }
            .province{
                width:20%;
            }
            .number{
                width:25%;
            }
            .percentage{
                position:relative;
                span{
                    float:left;
                    width:23%;
                }
                .progress{
                    float:left;
                    width:80%;
                    position:absolute;
                    top: 23px;
                    right:0;
                    transform: translateY(-50%)
                }
            }
        }
    }
</style>
