<template>
  <section class="box">
    <div class="header">
      <h3 class="title">{{config.title}}</h3>
      <div class="handler">
        <a href="javascript:;" v-if="config.isReload||isDev" @click="onReload"><i class="el-icon-refresh"></i></a>
        <a href="javascript:;" v-if="config.isPrint||isDev" @click="onPrint"><i class="el-icon-printer"></i></a>
        <!-- <a href="javascript:;"><i class="el-icon-minus"></i></a> -->
      </div>
    </div>
    <div class="body" ref="printArea">
      <slot ref="item"/>
    </div>
  </section>
</template>

<script>
import itemSkinMixin from '../mixins/itemSkin';

export default {
  mixins: [itemSkinMixin],
};
</script>
<style lang="scss" scoped>
$headerHeight: 36px;
.box{
  box-shadow: 0 0 2px 2px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;
  border-radius: 3px;
  background: #FFF;
  .header{
    height: $headerHeight;
    background: #eee;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    line-height: $headerHeight;
    position: relative;
  }
  .title{
    margin: 0;
    font-size: 14px;
    color: #555;
    padding-left: 10px;
  }
  .handler{
    position: absolute;
    right: 5px;
    top: 0;
    a{
      color: #555;
      padding: 0 5px;
      &:hover{
        color: #0da4d3;
      }
    }
  }
  .body{
    flex: 1;
  }
}
</style>
