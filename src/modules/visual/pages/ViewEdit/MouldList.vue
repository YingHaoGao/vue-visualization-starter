
<template>
<transition name="scale">
<div :class="$style.container" v-if="visible">
  <el-scrollbar class="no-horizontal" style="height: 100%">
    <div :class="$style.title">请选择一个视图模板</div>
    <el-alert
      type="warning"
      :class="$style.info"
      v-if="$parent.lastData"
      show-icon>
      <div slot="title"><span>你有一个上回编辑中的视图，是否继续？</span><el-link type="primary" @click="onUseLastData">继续使用</el-link></div>
    </el-alert>
    <div :class="$style.moulds">
      <div :class="$style.stitle">通用模板</div>
      <div :class="$style.views">
        <div :class="$style.view" v-for="(view,i) in viewList.common" :key="i" @click="selected(view)">
          <div :class="$style['view-cover']"></div>
          <div :class="$style['view-title']">{{view.title}}</div>
          <!-- <div :class="$style['view-description']">{{view.description}}</div> -->
        </div>
      </div>
    </div>
    <div :class="$style.moulds">
      <div :class="$style.stitle">自定义模板</div>
      <div :class="$style.views">
        <div :class="$style.view" v-for="(view,i) in viewList.custom" :key="i" @click="selected(view)">
          <div :class="$style['view-cover']"></div>
          <div :class="$style['view-title']">{{view.title}}</div>
          <!-- <div :class="$style['view-description']">{{view.description}}</div> -->
        </div>
      </div>
    </div>
  </el-scrollbar>
  <a :class="$style.close" v-show="visibleClose" href="javascript:;" @click="close"><i class="el-icon-close"></i></a>
</div>
</transition>
</template>
<script>
import { viewsConf } from '@/views';

export default {
  data() {
    return {
      visible: false,
      visibleClose: true,
    };
  },
  computed: {
    viewList() {
      const custom = [];
      const common = [];
      Object.keys(viewsConf).forEach((key) => {
        if (key.indexOf('common') === 0) common.push(viewsConf[key]);
        else custom.push(viewsConf[key]);
      })
      return {
        custom,
        common,
      };
    },
  },
  methods: {
    open(visibleClose = true) {
      this.visible = true;
      this.visibleClose = visibleClose;
    },
    close() {
      this.visible = false;
    },
    selected(mould) {
      this.$parent.selectedMould(mould);
      this.visible = false;
    },
    onUseLastData() {
      this.visible = false;
      this.$parent.useLastData();
    },
  },
};
</script>
<style lang="scss" module>
$margin: 0;
.container{
  position: absolute;
  left: $margin;
  right: $margin;
  top: $margin;
  bottom: $margin;
  background: #FFF;
  border: 15px solid #f0f2f5;
  border-radius: 5px;
  & *{
    font-weight: 300;
  }
}
.close{
  position: absolute;
  right: 0;
  top: 0;
  color: #555;
  font: 20px sans-serif;
  background: #FFF;
  padding: 10px;
  text-align: center;
  &:hover{
    color: #f56c6c;
  }
}
.title{
  padding: 20px 10px;
  text-align: center;
  color: #555;
  font-size: 22px;
}
.stitle{
  padding: 10px;
  text-align: left;
  color: #555;
  font-size: 16px;
  border-bottom: 1px solid #eee;
  margin: 0 20px;
}
.views{
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}
.view{
  background: rgba(235, 238, 245, 0.64);
  border-radius: 3px;
  margin: 10px;
  padding: 5px;
  width: 170px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover{
    background: rgba(175, 222, 250, 0.315);
    box-shadow: 0 0 2px 3px rgba(0,0,0, 0.1);
  }
}
.view-cover{
  height: 160px;
  width: 100%;
  background: #FFF center no-repeat;
  background-size: cover;
  border-radius: 3px;
}
.view-title{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  margin: 10px;
  font-size: 14px;
}
.view-description{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  margin: 10px;
  font-size: 12px;
}
.info{
  max-width: 400px;margin: 0 auto;
}
</style>
