<template>
    <el-submenu :index="`${route.path}-${route.id}`"
      v-if="route.children && route.children.length">
      <template slot="title">
        <i v-if="route.icon" :class="route.icon"></i>
        <span slot='title'> {{route.title}}</span>
      </template>
      <lx-menu-item v-for="item in route.children" :key="`${item.path}-${item.id}`" :route="item"></lx-menu-item>
    </el-submenu>
    <el-menu-item
      v-else
      :index="`${route.path}`">
      <i v-if="route.icon" :class="route.icon"></i>
      <span slot="title"> {{route.title}}</span>
    </el-menu-item>
</template>
<script>
import { isExternal } from '@/util';

export default {
  name: 'LxMenuItem',
  props: {
    route: {
      type: Object,
    },
  },
  methods: {
    to(path) {
      if (isExternal(path)) {
        return path;
      }
      return this.$router.push(path);
    },
  },
};
</script>

