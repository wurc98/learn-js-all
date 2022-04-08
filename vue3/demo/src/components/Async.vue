<template>
  <div>async</div>
  <button @click="showInput = !showInput">隐藏</button>
  <teleport to="body">
    <input v-focus v-if="showInput" />
  </teleport>
</template>

<script setup>
import { ref, defineProps } from "vue";

const showInput = ref(true);
</script>

<style>
</style>