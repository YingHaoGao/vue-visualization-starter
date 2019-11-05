<template>
<div>
  <el-upload
    class="avatar-uploader"
    :show-file-list="false"
    :action="`${API_BASE_URL}uploadFile`"
    accept="image/*"
    :multiple="false"
    :limit="1"
    :on-preview="onPreview"
    :on-remove="onRemove"
    :on-success="onSuccess"
    :on-error="onError">
    <img v-if="imageUrl" :src="API_BASE_URL+imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <!-- <ul class="el-upload-list el-upload-list--picture-card">
    <li tabindex="0" class="el-upload-list__item is-success">
      <img src="/examples/1.jpg" alt="" class="el-upload-list__item-thumbnail">
      <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check"></i></label>
      <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-preview"><i class="el-icon-zoom-in"></i></span>
        <span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span>
      </span>
    </li>
  </ul> -->
</div>
</template>

<script>
import { API_BASE_URL } from '@/config';

export default {
  name: 'CoverUpload',
  props: {
    onPreview: Function,
    onRemove: Function,
    onSuccess: Function,
    onError: Function,
    imageUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      API_BASE_URL,
    };
  },
};
</script>

<style lang="scss" scoped>
  .avatar-uploader{
    /deep/ {
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .el-upload:hover {
        border-color: #409EFF;
      }
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 110px;
    line-height: 110px;
    text-align: center;
  }
  .avatar {
    width: 130px;
    height: 110px;
    display: block;
  }
</style>
