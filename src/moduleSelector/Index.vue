<template>
<section>
  <h2 class="title">选择一个模块</h2>
  <div class="container">
    <div class="card" v-for="module in modules" :key="module.name" @click="$router.push(`/${module.name}`)">
      <div>
        <i class="el-icon-s-platform"></i>
      </div>
      <span> {{module.title}} </span>
    </div>
  </div>
</section>
</template>
<script>
import { MODULE_LIST } from '@/config';

export default {
  data() {
    return {
      // modules: MODULE_LIST,
    }
  },
  computed: {
    modules() {
      return MODULE_LIST.filter((item) => {
        if (!this.$store.getters.isSuperAdmin && item.name === 'roles') return false;
        return true;
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.title{
  text-align: center;
  color: #333;
  font-weight: 300;
}
.container{
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.card {
  border-radius: 4px;
  border: 1px solid #EBEEF5;
  background-color: #FFFFFF;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 200px;
  margin: 20px;
  display: flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  cursor: pointer;
  i{
    font-size: 60px;
    color: #ddd;
  }
}
</style>
