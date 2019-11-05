<template>
    <div class="weather">
        <div class="left">
            <ul class="header">
                <li>{{data.date}}</li>
                <li>{{data.week_day}}</li>
                <li>{{data.lunar_date}}</li>
            </ul>
            <div class="icon">
                <span :style="{background:'url('+ coverImgUrl +') no-repeat center', backgroundSize:'contain'}"></span>
            </div>
            <div class="main">
                <div class="temperature">
                    <span>{{data.temperature}}</span>
                </div>
                <div class="unit">
                    <span>℃</span>
                    <span>{{data.text}}(实时)</span>
                </div>
            </div>
            <div class="temperatureRange">{{data.t_scope}}℃</div>
            <div class="text">{{data.text_day_night}}</div>
<!--            <div class="wind">{{data.wind_direction}}风{{data.wind_scale}}</div>-->
<!--            <div class="airQuality">{{data.aqi}} {{data.quality}}</div>-->
        </div>
        <ul class="right">
            <li>
                <span>负氧离子</span>
                <span>
                    <ul class="anionList">
                        <li v-for="item in data.anion">{{item}}</li>
                    </ul>
                </span>
            </li>
            <li>
                <span>风力</span>
                <span>{{data.wind_scale}}</span>
            </li>
            <li>
                <span>湿度</span>
                <span>{{data.humidity}}%</span>
            </li>

            <li>
                <span>海浪</span>
                <span>{{data.sea_wave}}cm</span>
            </li>
            <li>
                <span>潮汐</span>
                <span>{{data.tide}}cm</span>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import itemMixin from '@/mixins/item';
import config, { mockData } from './Weather';
import icon0 from '../assets/images/weather_icons/0@1x.png';
import icon4 from '../assets/images/weather_icons/4@1x.png';
import icon9 from '../assets/images/weather_icons/9@1x.png';
import icon10 from '../assets/images/weather_icons/10@1x.png';
import icon11 from '../assets/images/weather_icons/11@1x.png';
import icon12 from '../assets/images/weather_icons/12@1x.png';
import icon13 from '../assets/images/weather_icons/13@1x.png';
import icon14 from '../assets/images/weather_icons/14@1x.png';
import icon15 from '../assets/images/weather_icons/15@1x.png';
import icon16 from '../assets/images/weather_icons/16@1x.png';
import icon17 from '../assets/images/weather_icons/17@1x.png';
import icon18 from '../assets/images/weather_icons/18@1x.png';
import icon19 from '../assets/images/weather_icons/19@1x.png';
import icon20 from '../assets/images/weather_icons/20@1x.png';
import icon21 from '../assets/images/weather_icons/21@1x.png';
import icon22 from '../assets/images/weather_icons/22@1x.png';
import icon23 from '../assets/images/weather_icons/23@1x.png';
import icon24 from '../assets/images/weather_icons/24@1x.png';
import icon25 from '../assets/images/weather_icons/25@1x.png';
import icon26 from '../assets/images/weather_icons/26@1x.png';
import icon27 from '../assets/images/weather_icons/27@1x.png';
import icon28 from '../assets/images/weather_icons/28@1x.png';
import icon29 from '../assets/images/weather_icons/29@1x.png';
import icon30 from '../assets/images/weather_icons/30@1x.png';
import icon31 from '../assets/images/weather_icons/31@1x.png';
import icon99 from '../assets/images/weather_icons/99@1x.png';

export default {
  name: 'Weather',
  mixins: [itemMixin],
  config() {
    return config;
  },
  data() {
    return {
      data: {
          date: '',
          week_day: '',
          lunar_date: '',
          temperature: '',
          t_scope: '',
          code: '',
          text: '',
          text_day_night: '',
          wind_direction: '',
          wind_scale: '',
          humidity: 0,
          anion: [],
          sea_wave: 0,
          tide: 0,
      },
      coverImgUrl:"",
    };
  },
  mounted() {
    this.onLoad();
      window.setInterval(() => {
          setTimeout(this.onLoad(),0)
      },1800000)
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
        //加载远程数据
          this.$http.get('/api/weather', {params: {location: '刘公岛'}}).then((res) => {
              if (res.data.code !== '200') return;
              this.data = res.data.data;
              switch(this.data.code){
                  case '0':
                      this.coverImgUrl = icon0;
                      break;
                  case '4':
                      this.coverImgUrl = icon4;
                      break;
                  case '9':
                      this.coverImgUrl = icon9;
                      break;
                  case '10':
                      this.coverImgUrl = icon10;
                      break;
                  case '11':
                      this.coverImgUrl = icon11;
                      break;
                  case '12':
                      this.coverImgUrl = icon12;
                      break;
                  case '13':
                      this.coverImgUrl = icon13;
                      break;
                  case '14':
                      this.coverImgUrl = icon14;
                      break;
                  case '15':
                      this.coverImgUrl = icon15;
                      break;
                  case '16':
                      this.coverImgUrl = icon16;
                      break;
                  case '17':
                      this.coverImgUrl = icon17;
                      break;
                  case '18':
                      this.coverImgUrl = icon18;
                      break;
                  case '19':
                      this.coverImgUrl = icon19;
                      break;
                  case '20':
                      this.coverImgUrl = icon20;
                      break;
                  case '21':
                      this.coverImgUrl = icon21;
                      break;
                  case '22':
                      this.coverImgUrl = icon22;
                      break;
                  case '23':
                      this.coverImgUrl = icon23;
                      break;
                  case '24':
                      this.coverImgUrl = icon24;
                      break;
                  case '25':
                      this.coverImgUrl = icon25;
                      break;
                  case '26':
                      this.coverImgUrl = icon26;
                      break;
                  case '27':
                      this.coverImgUrl = icon27;
                      break;
                  case '28':
                      this.coverImgUrl = icon28;
                      break;
                  case '29':
                      this.coverImgUrl = icon29;
                      break;
                  case '30':
                      this.coverImgUrl = icon30;
                      break;
                  case '31':
                      this.coverImgUrl = icon31;
                      break;
                  default:
                      this.coverImgUrl = icon99;
                      break;
              }
              this.data.anion = (`${res.data.data.anion}`).split('');
          })
      } else {
        const res = mockData();
        if (res.code !== '200') return;
        this.data = res.data;
        switch(this.data.code){
            case '9':
                this.coverImgUrl = icon9;
                break;
            default:
                this.coverImgUrl = icon99;
                break;
        }
          this.data.anion = (`${res.data.anion}`).split('');
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
    .weather {
        width: 100%;
        height: 100%;
        /*color: #D5DAE4;*/
        color:#f4f4f4;
        font-family: "Microsoft YaHei";
        .left {
            width: 50%;
            height: 100%;
            float: left;
            font-size:18px;
            background: linear-gradient(to top, #11143D, #46566F); /* 标准的语法（必须放在最后） */
            .header {
                width: 100%;
                height: 15%;
                padding: 0 10px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                text-align: center;
                li {
                    margin-right: 30px;
                    &:nth-child(1) {
                        text-align: right;
                    }
                    &:nth-child(3) {
                        text-align: left;
                    }
                }
                li:last-child{
                    margin-right: 0;
                }
            }
            .icon {
                width: 100%;
                height: 30%;
                position:relative;
                span {
                    position:absolute;
                    left:50%;
                    top:50%;
                    transform: translate(-50%,-50%);
                    margin: 0 auto;
                    width: 76px;
                    height: 76px;
                    background:url('../assets/images/weather_icons/9@1x.png') no-repeat center;
                    background-size:contain;
                }
            }
            .main {
                height:20%;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                .temperature {
                    flex: 1;
                    font-size: 60px;
                    text-align: right;
                    padding-right:5px;
                }
                .unit {
                    flex: 1;
                    height: 90%;
                    margin-top:10%;
                    font-size: 18px;
                    padding-left:5px;
                    span {
                        text-align: left;
                        display: block;
                        width: 100%;
                        height: 50%;
                        &:nth-child(1){
                            height:100%;
                            display:table-cell; /*按照单元格的样式显示元素*/
                            vertical-align:bottom; /*底对齐*/
                        }
                    }
                }
            }
            .temperatureRange{
               margin-top:5%;
            }
            .temperatureRange,.text,.wind,.airQuality{
                height:9.5%;
                text-align: center;
            }
        }
        .right {
            float: left;
            width: 50%;
            height: 100%;
            font-size:18px;
            li {
                width: 100%;
                padding: 0 10px;
                box-sizing: border-box;
                height: 20%;
                display: flex;
                align-items: center;
                display: flex;
                /*background:url('../assets/images/weatherBg.png') no-repeat;*/
                /*background-size:contain;*/
                background: linear-gradient(#101938 60%, #878B9B 100%); /* 标准的语法（必须放在最后） */
                span {
                    flex: 1;
                    &:nth-child(2) {
                        color: #92D050;
                        text-align: center;
                    }
                    .anionList { 
                        li{
                            float: left;
                            width: 20px;
                            background: #92D050;
                            color: #fff;
                            margin-right: 6px;
                            padding: 6px 4px;
                            -webkit-border-radius: 3px;
                            -moz-border-radius: 3px;
                            border-radius: 3px;
                            &:last-child{
                                margin-right: 0;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
