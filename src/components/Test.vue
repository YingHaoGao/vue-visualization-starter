<template>
<div>
  <h1>{{text}}</h1>
</div>
</template>

<script>
export default {
  name: 'Test',
  props: {
    text: {
      type: String,
      default: '测试文本',
    },
  },
  data() {
    return {
    };
  },
};
</script>
