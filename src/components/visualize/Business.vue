<script setup>
import { onMounted } from 'vue';
import { testApi } from '@/api/analyze.js';

onMounted(async () => {
  try {
    const response = await testApi();
    console.log('Test API Response:', response);
  } catch (error) {
    console.error('Failed to fetch test API:', error);
  }
});
</script>

<template>
  <div class="bg-red-50 mt-8">
    <h1 class="text-black">商户</h1>
    <p>正在加载...</p>
  </div>
</template>

<style scoped>
/* 你可以在这里添加一些样式 */
</style>