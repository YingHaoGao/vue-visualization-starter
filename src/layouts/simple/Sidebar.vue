<template>
<el-scrollbar class="no-horizontal">
  <el-menu
    :router="true"
    :default-active="$route.path">
      <lx-menu-item v-for="(item, index) in menus"
      :key="`${item.path}-${index}`"
      :route="item"
      ></lx-menu-item>
  </el-menu>
</el-scrollbar>
</template>
<script>
import LxMenuItem from './MenuItem.vue';

export default {
  name: 'Sidebar',
  components: {
    LxMenuItem,
  },
  computed: {
    menus() {
      return this.$store.state.category.data;
    },
  },
};
</script>
