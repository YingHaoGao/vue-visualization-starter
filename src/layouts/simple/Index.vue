<template>
<section class="lx-container lx-vertical lx-full">
  <lx-header class="lx-header"/>
  <section class="lx-container">
    <aside class="lx-aside">
      <lx-sidebar class="lx-menu"/>
    </aside>
    <section class="lx-container lx-vertical">
      <main class="lx-main" ref="lx-main">
        <slot v-if="this.$slots.default"/>
        <router-view v-else :key="$route.path"/>
      </main>
    </section>
  </section>
  <lx-common-view/>
</section>
</template>
<script>
import LxHeader from './Header.vue';
import LxSidebar from './Sidebar.vue';

export default {
  name: 'Layout',
  components: {
    LxHeader,
    LxSidebar,
  },
  provide() {
    return {
      shell: this,
    }
  },
};
</script>
<style lang="scss" src="./layout.scss"></style>
