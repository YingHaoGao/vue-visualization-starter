<template>
    <section class="visitorType">
        <!--<div class="echart" ref="echart"></div>-->
        <ul class="bar">
            <li v-show="data.offline.percentage !== '0'" :style="{width:data.offline ?data.offline.percentage+'%':''}"><span>{{data.offline ?data.offline.percentage+'%':''}}</span>
            </li>
            <li v-show="data.online.percentage !== '0'" :style="{width:data.online?data.online.percentage-1+'%':''}">
                <span>{{data.online?data.online.percentage+'%':''}}</span>
            </li>
        </ul>
        <div class="description">
            <ul class="number">
                <li class="fontBlue">{{data.offline?data.offline.number:''}}</li>
                <li class="fontGreen">{{data.online ?data.online.number:''}}</li>
            </ul>
            <ul class="word">
                <li>线下售票</li>
                <li>线上售票</li>
            </ul>
        </div>
    </section>
</template>

<script>
import itemMixin from '@/mixins/item';
import config, { mockData } from './TicketType';

export default {
  name: 'TicketType',
  mixins: [itemMixin],
  config() {
    return config;
  },
  data() {
    return {
      data: {
        online: {},
        offline: {},
      },
    };
  },
  mounted() {
      this.onLoad();
      window.setInterval(() => {
          setTimeout(this.onLoad(),0)
      },600000)
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
      let data,percentage;
      if (this.isProd) {
        // 加载远程数据
          this.$http.get('/api/ticketType').then((res) => {
              if (res.data.code !== '200') return;
              data = res.data.data;
              data.forEach((item) => {
                  if(item.total !== 0){
                      percentage = ((item.number / item.total) * 100).toFixed(0);
                      if (item.type === 0) {
                          this.data.offline = {
                              percentage,
                              number: item.number,
                          };
                      } else if (item.type === 1) {
                          this.data.online = {
                              percentage,
                              number: item.number,
                          };
                      }
                  }
                  else{
                      if (item.type === 0) {
                          this.data.offline = {
                              percentage: '0',
                              number: item.number,
                          };
                      } else if (item.type === 1) {
                          this.data.online = {
                              percentage: '0',
                              number: item.number,
                          };
                      }
                  }
                  // console.log("data++++++",this.data)
              });
          })
      } else {
        const res = mockData();
        if (res.code !== '200') return;
        data = res.data;
          data.forEach((item) => {
              const percentage = ((item.number / item.total) * 100).toFixed(0);
              if (item.type === 0) {
                  this.data.offline = {
                      percentage,
                      number: item.number,
                  };
              } else if (item.type === 1) {
                  this.data.online = {
                      percentage,
                      number: item.number,
                  };
              }
          });

      }

    },
    onReload() {
      this.onLoad();
    },
    onResize() {
    },
    onNext() {},
    onPrev() {},
    onPrint() {},
  },
};
</script>

<style scoped lang="scss">
    .visitorType {
        font-family: "Microsoft YaHei";
        width:100%;
        height: 100%;
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
                    background-color: #bea31e;
                    span {
                        margin-left: 10px;
                    }
                }
                &:last-child {
                    background-color: #5fbb92;
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
            li {
                width: 50%;
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
            color: #C2E59D
        }
        .word {
            /*color: #fff;*/
            color:#f4f4f4;
        }
    }
</style>
