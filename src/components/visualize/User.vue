<script setup>
import { onMounted, ref } from 'vue';
import { getStatistics, updateStatistics } from '@/api/analyze.js';
import * as echarts from 'echarts';

const statistics = ref(null);

onMounted(async () => {
  try {
    const response = await getStatistics();
    statistics.value = response;
    console.log('Statistics:', response);
    initEcharts();
  } catch (error) {
    console.error('Failed to fetch statistics:', error);
  }
});

const updateData = async () => {
  const confirmed = confirm('确定要更新数据吗？');
  if (confirmed) {
    try {
      const response = await updateStatistics();
      alert('数据更新成功');
      statistics.value = response;
      initEcharts();
    } catch (error) {
      alert('数据更新失败');
      console.error('Failed to update statistics:', error);
    }
  }
};

const initEcharts = () => {
  if (!statistics.value) return;

  // 初始化所有图表
  initReviewInYearChart();
  initBusinessCheckinRankingChart();
  initCityCheckinRankingChart();
  initCheckinPerHourChart();
  initCheckinPerYearChart();
  initEliteUserPercentChart();
};
</script>

<template>

</template>

<style scoped>

</style>