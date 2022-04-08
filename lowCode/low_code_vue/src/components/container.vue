<template>
  <div class="container" @dragover.prevent @drop.stop="handleDrop">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "container",
  props: {
    jsonSchema: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    // 组件被放入container 回调
    handleDrop(e) {
      this.$emit("drop", e, this);
    },
  },
};
</script>

<style scoped>
.container {
  background: var(--mainBg);
  border: 1px solid var(--mainLine);
  min-height: 300px;
}
</style>