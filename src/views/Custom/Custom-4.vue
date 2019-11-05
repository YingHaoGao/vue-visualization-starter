<template>
<div>
    <section class="container" :style="style">
        <div class="container-item">
            <div class="item left-one">
                <smart-item :config="items.config[0]" :index="0" :mode="mode"></smart-item>
            </div>
            <div class="item left-two">
                <smart-item :config="items.config[1]" :index="1" :mode="mode"></smart-item>
            </div>
            <div class="item left-three">
                <smart-item :config="items.config[2]" :index="2" :mode="mode"></smart-item>
            </div>
            <div class="item left-four">
                <smart-item :config="items.config[3]" :index="3" :mode="mode"></smart-item>
            </div>
        </div>
        <div class="container-item">
            <div class="item center-one">
                <smart-item :config="items.config[4]" :index="4" :mode="mode"></smart-item>
            </div>
            <div class="item center-two">
                <smart-item :config="items.config[5]" :index="5" :mode="mode"></smart-item>
            </div>
            <div class="item center-three">
                <smart-item :config="items.config[6]" :index="6" :mode="mode"></smart-item>
            </div>
        </div>
        <div class="container-item">
            <div class="item right-one">
                <smart-item :config="items.config[7]" :index="7" :mode="mode"></smart-item>
            </div>
            <div class="item right-two">
                <smart-item :config="items.config[8]" :index="8" :mode="mode"></smart-item>
            </div>
            <div class="item right-three">
                <smart-item :config="items.config[9]" :index="9" :mode="mode"></smart-item>
            </div>
        </div>
    </section>
    <div class="add-grid" :class="items.config.length?'':'center'" v-if="!isProd">
        <el-button-group>
            <el-button type="" size="mini" @click="onZoom(1)" round icon="el-icon-zoom-in">放大</el-button>
            <el-button type="" size="mini" @click="onZoom(-1)" round icon='el-icon-zoom-out'>缩小</el-button>
        </el-button-group>
    </div>
</div>
</template>
<script>
import SmartItem from '@/components/SmartItem';
import viewMixin from '@/mixins/view';
import config from './Custom-4';

const createItems = () => {
    const items = {
    config: [],
    layout: [],
    };
    for (let i = 0; i < config.gridNumber; i += 1) {
    items.config.push({});
    items.layout.push({});
    }
  return items;
}

export default {
  config,
  mixins: [viewMixin],
  components: { SmartItem },
  data() {
    return {
      items: createItems(),
      scale: 1,
    };
  },
  computed: {
    style() {
      const style = {};
      if (this.config.maxWidth) {
        style.maxWidth = `${this.config.maxWidth}px`;
      }
      if (this.config.minWidth) {
        style.minWidth = `${this.config.minWidth}px`;
      }
      if (this.config.fixedWidth) {
        style.width = `${this.config.fixedWidth}px`;
      }
      style.transform = `scale(${this.scale})`;
      return style;
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
      onZoom(e) {
          this.scale = this.scale + (e * 0.1);
      },
  },
};
</script>
<style lang="scss" scoped>
    .container {
        transform-origin: left top;
        /*padding: 15px;*/
        /*height:100%;*/
        /*position:absolute;*/
        /*left:0;*/
        /*top:0;*/
        /*bottom:0;*/
        /*right:0;*/
        width:1920px;
        height:1080px;
        background:url('../../assets/images/big-screen-bg.jpg') center no-repeat;
        background-size:cover;
        display:flex;
        .container-item{
            height:100%;
            /*float:left;*/
            /*&:first-child,&:last-child{*/
                /*width:30%;*/
            /*}*/
            &:nth-child(2){
                /*width:40%;*/
                border:1px dotted #DEEBF7;
                border-top:none;
                border-bottom:none;
            }
            flex:1;
            .item{
                position:relative;
            }
            .left-one{
                width:100%;
                height:50%;
            }
            .left-two{
                width:100%;
                height:15%;
            }
            .left-three{
                width:100%;
                height:15%;
            }
            .left-four{
                width:100%;
                height:20%;
            }
            .center-one{
                width:100%;
                height:34%;
            }
            .center-two{
                width:100%;
                height:33%;
            }
            .center-three{
                width:100%;
                height:33%;
            }
            .right-one{
                width:100%;
                height:30%;
            }
            .right-two{
                width:100%;
                height:35%;
            }
            .right-three{
                width:100%;
                height:35%;
            }
        }
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }
.add-grid{
    text-align: center;
    position: fixed;
    bottom: 15px;
    right: 68px;
    transform: translateX(0);
    transition: all 0.4s;
    &.center {
      right: 50%;
      transform: translateX(100%);
      bottom: 50%;
    }
  }
</style>
