<template>
    <div class="travelAgency">
        <div class="header">
            <h3>旅行社团队数量排行榜</h3>
        </div>
        <table class="tableData">
            <thead>
            <tr>
                <th class="ranking">排名</th>
                <th class="province">旅行社名称</th>
                <th class="other" colspan="3">团队数量占比</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in tableData" v-if="index<5">
                <td class="ranking">{{index+1}}</td>
                <td class="province">{{item.name}}</td>
                <td class="number">{{item.number}}</td>
                <td class="percentage">{{item.percentage}}%</td>
                <td>
                    <el-rate
                            v-model="item.rate"
                            disabled
                            score-template="{item.rate}"
                            :colors="['#93D053','#93D053','#93D053']"
                            disabled-void-color="#404040"
                    >
                    </el-rate>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import itemMixin from '@/mixins/item';
import config, { mockData } from './travelAgency';

export default {
  name: 'travelAgency',
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
      // window.setInterval(() => {
      //     setTimeout(this.onLoad(),0)
      // },600000)
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
          this.$http.get('/api/travelAgency').then((res) => {
              if (res.data.code !== '200') return;
              this.tableData = res.data.data;
          })
          //console.log('旅行社数据', this.tableData);
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
    .travelAgency{
        .el-rate__icon{
            font-size:30px;
            margin-right:2px;
            margin-top:-2px;
        }
    }
</style>
<style scoped lang="scss">
    .travelAgency{
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
            height:88%;
            color:#f4f4f4;
            font-size:16px;
            th,tr{
                width:100%;
                height:17.6%;
            }
            tr{
                border-bottom:1px solid #F3F2F2;
            }
            .ranking{
                width:10%;
            }
            .province{
                width:25%;
            }
            .other{

            }
        }
    }
</style>
