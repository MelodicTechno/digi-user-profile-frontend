<script setup>
import { onMounted } from 'vue';
import { getStatistics } from '@/api/analyze.js';

onMounted(async () => {
  try {
    const response = await getStatistics();
    console.log('Statistics:', response);
  } catch (error) {
    console.error('Failed to fetch statistics:', error);
  }
});
</script>

<template>
  <div class="bg-red-50 mt-8">
    <h1 class="text-black">商户分析</h1>
    <p>正在加载...</p>
  </div>
</template>

<style scoped>
/* 你可以在这里添加一些样式 */
</style>