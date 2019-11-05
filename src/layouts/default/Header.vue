<template>
  <header>
    <div class="logo" @click="$root.openModuleSelector">
      {{PROJECT_NAME}}
    </div>
    <div>
      <a href="javascript:;" class="item circle" @click="openedCommonView('ServiceList')">
        <i class="el-icon-menu"></i>
      </a>
      <!-- <a href="javascript:;" class="item circle" @click="openedCommonView('MessageList')">
        <i class="el-icon-message-solid"></i>
      </a> -->
      <el-dropdown placement="bottom-end">
        <a href="javascript:;" class="item">
          <i class="el-icon-s-custom"></i> {{userinfo.username}} <i class="fa fa-angle-down"></i>
        </a>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item @click.native="openedCommonView('Userinfo')">
            <i class="el-icon-s-custom"></i> 用户信息
          </el-dropdown-item>
          <el-dropdown-item @click.native="openedCommonView('Preference')">
            <i class="el-icon-s-tools"></i> 编好设置
          </el-dropdown-item> -->
          <el-dropdown-item @click.native="$router.logout">
            <i class="fa fa-sign-out"></i> 退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
  computed: {
    userinfo() {
      return this.$store.state.userinfo;
    },
  },
  methods: {
    openedCommonView(e) {
      this.$store.commit('toggleCommonView', e);
    },
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
