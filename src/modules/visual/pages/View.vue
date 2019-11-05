
<template>
<section class="container">
  <div class="header" :class="{active:showMore}" v-if="showView">
    <div class="handler" @click="showMore=!showMore">
      <i :class="showMore?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
    </div>
    <div class="action">
      <el-tooltip content="分享" placement="bottom">
        <el-button size="mini" type="primary" icon="el-icon-share" circle @click="doCopy"></el-button>
      </el-tooltip>
      <el-tooltip content="打印" placement="bottom">
        <el-button size="mini" type="primary" icon="el-icon-printer" @click="onPrint" circle></el-button>
      </el-tooltip>
    </div>
  </div>
  <div class="view-container" ref="printArea" v-loading="loading">
    <el-scrollbar ref="scrollbar" class="no-horizontal" style="height:100%">
      <smart-view v-if="showView" :config="config" :items="items" mode="production" ref="view"/>
    </el-scrollbar>
  </div>
</section>
</template>
<script>
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import SmartView from '@/components/SmartView';
import { getViewConf } from '@/views';
import '@/util/print';

Vue.use(VueClipboard);
export default {
  components: { SmartView },
  data() {
    return {
      config: {},
      items: {},
      loading: true,
      showView: false,
      showMore: true,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      let { id } = this.$route.params;
      this.id = id;
      let views = {};
      let res = null;
      try {
        if (id === 'default' || !id) {
          res = await this.$http.get(`/myview`, {
            params: {
              isDefault: 1,
            }
          });
          if (res.data.status !== 'OK' || !res.data.data.length) {
            if (!id) throw new Error('没有找到模板');
            else return this.$router.replace(`/${this.$root.moduleName}/welcome`);
          } else views = res.data.data[0];
          this.id = views.id;
        } else {
          res = await this.$http.get(`/view/${id}`);
          if (res.data.status !== 'OK') throw new Error('没有找到模板');
          views = res.data.data;
        }
        const templateMeta = JSON.parse(views.templateMeta) || null;
        const components = JSON.parse(views.components) || null;
        delete views.templateMeta;
        delete views.components;
        const viewConf = getViewConf(views.templateKey);
        this.config = Object.assign({}, viewConf, templateMeta, views);
        this.showView = true;
        this.id = views.id;
        if (components) {
          this.$nextTick(() => {
            if (this.$refs.view) this.$refs.view.items = components;
          })
        }
        document.title = this.config.title;
      } catch (e) {
        console.error(e);
        this.$message.error(e.message || e);
      } finally {
        setTimeout(() => this.showMore = false, 600);
        this.loading = false;
      }
    },
    onPrint(){
      $(this.$refs.printArea).printThis({
        loadCSS: "/print.css",
        printDelay: 0,
        canvas: true,
      });
    },
    doCopy: function () {
      const {
        origin,
        pathname,
      } = window.location;
      this.$copyText(`${origin}${pathname}#/visual/view/share?id=${this.id}`).then((e) => {
        this.$message.success('已复制到粘贴板');
      }, function (e) {
        this.$message.error('复制失败！');
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.container{
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header{
  padding: 10px 20px 15px;
  background: #304156;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  position: absolute;
  right: 10px;
  top: 0;
  z-index: 1;
  text-align: center;
  transition: transform 0.4s;
  transform: translateY(-100%);
  cursor: pointer;
  .handler{
    color: #FFF;
    position: absolute;
    bottom: -18px;
    left: 50%;
    width: 30px;
    height: 18px;
    line-height: 18px;
    margin-left: -20px;
    padding: 0 10px;
    background: #304156;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  &.active{
    transform: translateY(0);
  }
  .action{
    position: relative;
  }
}
.view-container{
  flex: 1;
  min-height: 200px;
  // padding-top: 15px;
}
</style>
