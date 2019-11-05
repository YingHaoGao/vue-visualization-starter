<template>
<section class="lx-container lx-vertical lx-full">
  <lx-header class="lx-header" v-show="!isFullscreen"/>
  <section class="lx-container">
    <aside class="lx-aside" v-show="!isFullscreen" :class="{ collapsed: collapsed }">
      <lx-menu-list class="lx-menu"/>
      <div class="lx-status" @click="onSidebar">
        <a v-if="$store.state.workbenchUrl" :href="$store.state.workbenchUrl">
          <i class="fa fa-th"></i>
          <span v-if="$store.state.sidebar.opened"> 返回工作台</span>
        </a>
        <!-- <a href="javascript:;">
          <i :class="`el-icon-d-arrow-${$store.state.sidebar.opened ? 'left':'right'}`"></i>
        </a> -->
      </div>
    </aside>
    <section class="lx-container lx-vertical">
      <main class="lx-main" ref="lx-main">
        <transition name="fade-transform" mode="out-in"
          v-on:after-enter="afterEnter"
          v-on:before-leave="beforeLeave">
          <!-- <el-scrollbar class="no-horizontal" style="height:100%"> -->
            <!-- <router-view :key="$route.fullPath"/> -->
            <slot v-if="this.$slots.default"/>
            <router-view v-else :key="$route.path"/>
          <!-- </el-scrollbar> -->
        </transition>
      </main>
    </section>
  </section>
  <lx-common-view/>
</section>
</template>
<script>
import screenfull from 'screenfull';
import { scrollToTop } from '@/util';
import LxHeader from './Header.vue';
import LxMenuList from './MenuList.vue';
import LxBreadcrumb from './Breadcrumb.vue';
import LxCommonView from './CommonView.vue';

export default {
  name: 'Layout',
  components: {
    LxHeader,
    LxMenuList,
    LxBreadcrumb,
    LxCommonView,
  },
  provide() {
    return {
      shell: this,
    };
  },
  data() {
    return {
      isFullscreen: false,
    };
  },
  computed: {
    collapsed() {
      return !this.$store.state.sidebar.opened;
    },
  },
  async created() {
    // await this.$root.loadMenu();
  },
  mounted() {
    console.log(this);
    this.scrollToTop = animated => scrollToTop(this.$refs['lx-main'], animated);
    screenfull.on('change', () => {
      this.isFullscreen = screenfull.isFullscreen;
    });
  },
  methods: {
    onSidebar() {
      // this.$store.commit('toggleSidebar');
    },
    beforeLeave() {
      this.$refs['lx-main'].style.overflow = 'hidden';
    },
    afterEnter() {
      this.$refs['lx-main'].style.overflow = 'auto';
    },
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
};
</script>
<style lang="scss" src="./layout.scss"></style>
