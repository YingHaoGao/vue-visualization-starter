<template>
  <header>
    <div class="logo">
      {{PROJECT_NAME}}
    </div>
    <div>
      <a href="javascript:;" class="item" @click="$root.openModuleSelector">
        <i class="el-icon-menu"></i>
      </a>
      <a href="javascript:;" class="item" @click.native="$router.logout">
        <i class="el-icon-switch-button"></i> 退出登录
      </a>
    </div>
  </header>
</template>
<script>
import { PROJECT_NAME } from '@/config';

export default {
  name: 'LxHeader',
  data() {
    return {
      PROJECT_NAME,
    };
  },
};
</script>

<style lang="scss" scoped>
.logo{
  cursor: pointer;
}
.item{
  background: #FFF;
  border-radius: 15px;
  padding: 3px 15px;
  line-height: 1;
  font-size: 14px;
  border: 1px solid transparent;
  margin-left: 10px;
  display: inline-block;
  transition: all 0.3s;
  &:hover{
    border-color: #000;
  }
}
</style>
