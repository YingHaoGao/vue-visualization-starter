<template>
    <section class="visitorType">
        <!--<div class="echart" ref="echart"></div>-->
        <ul class="bar">
            <li v-show="data.personal.percentage > 0" :style="{width:data.personal ?data.personal.percentage+'%':''}"><span>{{data.personal ?data.personal.percentage+'%':''}}</span>
            </li>
            <li v-show="data.student.percentage > 0" :style="{width:data.student?data.student.percentage+'%':''}"><span>{{data.student?data.student.percentage+'%':''}}</span>
            </li>
            <li v-show="data.team.percentage > 0" :style="{width:data.team?data.team.percentage-1+'%':''}">
                <span>{{data.team?data.team.percentage+'%':''}}</span></li>
        </ul>
        <div class="description">
            <ul class="number">
                <li class="fontBlue">{{data.personal?data.personal.number:''}}</li>
                <li class="fontOrange">{{data.student?data.student.number:''}}</li>
                <li class="fontGreen">{{data.team ?data.team.number:''}}</li>
            </ul>
            <ul class="word">
                <li>散客人数</li>
                <li>学员人数</li>
                <li>团队人数</li>
            </ul>
        </div>
    </section>
</template>

<script>
import itemMixin from '@/mixins/item';
import config, { mockData } from './VisitorType';

export default {
  name: 'VisitorType',
  mixins: [itemMixin],
  config() {
    return config;
  },
  data() {
    return {
      data: {
        personal: {},
        student: {},
        team: {},
      },
    };
  },
  mounted() {
      this.onLoad();
      window.setInterval(() => {
          setTimeout(this.onLoad(), 0)
      }, 2400000)
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
      var data;
      if (this.isProd) {
        // 加载远程数据
          this.$http.get('/api/visitorType?type=personal&type=student&type=team').then((res) => {
              if (res.data.code !== '200') return;
              data = res.data.data;
              data.forEach((item) => {
                  if(item.total !== 0){
                      const percentage = ((item.number / item.total) * 100).toFixed(0);
                      this.data[item.type] = {
                          percentage,
                          number: item.number,
                      };
                  }
                  else{
                      this.data[item.type] = {percentage:0,number:0};
                  }
              });
          })
      } else {
        const res = mockData();
        if (res.code !== '200') return;
        data = res.data;
          data.forEach((item) => {
              const percentage = ((item.number / item.total) * 100).toFixed(0);
              this.data[item.type] = {
                  percentage,
                  number: item.number,
              };
          });
          //console.log('游客类型数据', this.data);
      }

    },
  },
  onReload() {
    this.onLoad();
  },
  onResize() {
  },
  onNext() {},
  onPrev() {},
  onPrint() {},
};
</script>

<style scoped lang="scss">
    .visitorType {
        width:100%;
        height: 100%;
        font-family: "Microsoft YaHei";
        padding:10px 20px 0;
        box-sizing: border-box;
        .bar {
            width: 100%;
            height: 30%;
            color: #fff;
            li {
                float: left;
                height: 100%;
                font-size: 18px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                &:first-child {
                    background-color: #1797bc;
                    span {
                        margin-left: 10px;
                    }
                }
                &:nth-child(2) {
                    background-color: #c3a020;
                    span {
                        margin-left: 10px;
                    }
                }
                &:last-child {
                    background-color: #41645d;
                    display: flex;
                    justify-content: flex-end;
                    span {
                        margin-right: 10px;
                    }
                }
            }
        }
        .description{
            height: 70%;
            padding-top:20px;
            box-sizing: border-box;
        }
        .number, .word {
            width: 99%;
            display: flex;
            align-items: center;
            font-size: 18px;
            /*margin: 5px 0;*/
            box-sizing: border-box;
            li {
                width: 33%;
                &:first-child {
                    text-align: left;
                }
                &:nth-child(2) {
                    text-align: center;
                }
                &:last-child {
                    text-align: right;
                }
            }
        }
        .fontBlue {
            color: #08ABEF;
        }
        .fontOrange {
            color: #F7BD1A;
        }
        .fontGreen {
            color: #91CF55
        }
        .word {
            /*color: #fff;*/
            color:#f4f4f4;
        }
    }
</style>
