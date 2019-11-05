<template>
    <div class="others">
        <ul>
            <li class="left">
                <div class="icon tradMoneyIcon"></div>
                <div class="show">
                    <span>{{tradMoney}}</span>
                    <span>交易金额</span>
                </div>
            </li>
            <li class="left">
                <div class="icon tradNumberIcon"></div>
                <div class="show">
                    <span>{{tradNumber}}</span>
                    <span>交易数量</span>
                </div>
            </li>
            <li class="right">
                <div class="icon tousuIcon"></div>
                <div class="show">
                    <span>{{complain}}</span>
                    <span>游客投诉</span>
                </div>
            </li>
        </ul>
        <ul>
            <li  class="left">
                <div class="icon carParkingIcon"></div>
                <div class="show">
                    <span>{{car.free_parking}}</span>
                    <span>空余车位</span>
                </div>
            </li>
            <li  class="left">
                <div class="icon carRealtimeIcon"></div>
                <div class="show">
                    <span>{{car.car_realtime}}</span>
                    <span>实时车辆</span>
                </div>
            </li>
            <li  class="right">
                <div class="icon carIcon"></div>
                <div class="show">
                    <span>{{car.total}}</span>
                    <span>当日累计车辆</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import itemMixin from '@/mixins/item';
import config, { tradMocckData, complainMocckData, carMocckData } from './Other';

export default {
  name: 'Other',
  mixins: [itemMixin],
  config() {
    return config;
  },
  data() {
    return {
      tradMoney: 0,
      tradNumber: 0,
      complain: 0,
      car: {
          free_parking: 0,
          car_realtime: 0,
          total: 0
      },
    };
  },
  mounted() {
      this.onLoadTrade();
      this.onLoadComplain();
      this.onLoadCar();
        window.setInterval(() => {
            setTimeout(this.onLoadTrade(),0)
        },600000);
      window.setInterval(() => {
          setTimeout(this.onLoadComplain(),0)
      },14400000);
      window.setInterval(() => {
          setTimeout(this.onLoadCar(),0)
      },1800000);
  },
  methods: {
    draw() {},
    failCallback() {},
    alwaysCallback() {},
    onInit() {},
    /**
     * 初始化时加载
     */
    onLoadTrade() {
      if (this.isProd) {
        // 加载远程数据
          this.$http.get('/api/trading').then((tradRes) => {
              if (tradRes.data.code !== '200') return;
              const data = tradRes.data.data;
              this.tradMoney = data.money.toFixed(2);
              this.tradNumber = data.number;
          })

      } else {
        const tradRes = tradMocckData();
        if (tradRes.code !== '200') return;
        const data = tradRes.data;
        this.tradMoney = data.money;
        this.tradNumber = data.number;
      }
    },
      onLoadComplain() {
          if (this.isProd) {
              // 加载远程数据
              this.$http.get('/api/complain').then((complainRes) => {
                  if (complainRes.data.code !== '200') return;
                  this.complain = complainRes.data.data;
              })

          } else {
              const complainRes = complainMocckData();
              if (complainRes.code !== '200') return;
              this.complain = complainRes.data;
          }
      },
      onLoadCar() {
          if (this.isProd) {
              // 加载远程数据
              this.$http.get('/api/car').then((carRes) => {
                  // console.log("CAR: ", carRes.data);
                  if (carRes.data.code !== '200') return;
                  this.car = carRes.data.data;
                  this.car.free_parking = carRes.data.data.free_parking;
                  this.car.car_realtime = carRes.data.data.car_realtime;
                  this.car.total = carRes.data.data.total;
              })

          } else {
              const carRes = carMocckData();
              if (carRes.code !== '200') return;
              this.car.free_parking = carRes.data.free_parking;
              this.car.car_realtime = carRes.data.car_realtime;
              this.car.total = carRes.data.total;
          }
      },
  },
  onReload() {
    this.onLoadTrade();
    this.onLoadComplain();
    this.onLoadCar();
  },
  onResize() {
  },
  onNext() {},
  onPrev() {},
  onPrint() {},
};
</script>

<style scoped lang="scss">
    .others {
        font-family: "Microsoft YaHei";
        width: 100%;
        height: 100%;
        padding:30px 30px 0;
        box-sizing: border-box;
        ul {
            height: 50%;
            li {
                float:left;
                height:100%;
                .icon{
                    margin-top:10px;
                    width:30px;
                    height:30px;
                }
                .show{
                    font-size:18px;
                    span{
                        display:block;
                        height:50%;
                        &:nth-child(1){
                            color:#FFC000;
                        }
                        &:nth-child(2){
                            color:#f4f4f4;
                        }
                    }
                }
            }
            li:first-child,li:last-child{
                width:40%;
            }
            .left{
                .icon,.show{
                    float:left;
                }
                .icon{
                  margin-right:10px;
                }
            }
            .right{
                .icon,.show{
                    float:right;
                }
                .icon{
                    margin-left:15px;
                }
                .show{
                    text-align: right;
                }
            }
        }
        .tradMoneyIcon{
           background:url('../assets/images/tradMoney.png') no-repeat;
            background-size:contain;
        }
        .tradNumberIcon{
            background:url('../assets/images/tradNumber.png') no-repeat;
            background-size:contain;
        }
        .tousuIcon{
            background:url('../assets/images/tousu.png') no-repeat;
            background-size:contain;
        }
        .carIcon{
            background:url('../assets/images/carNumber.png') no-repeat;
            background-size:contain;
        }
        .carRealtimeIcon{
            background:url('../assets/images/carRealtime.png') no-repeat;
            background-size:contain;
        }
        .carParkingIcon{
            background:url('../assets/images/carParking.png') no-repeat;
            background-size:contain;
        }
    }
</style>
