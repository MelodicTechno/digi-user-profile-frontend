<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <h3 class="text-lg font-medium mb-4">消费偏好分析</h3>
    <div ref="chart" class="h-80"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chart = ref(null);

onMounted(() => {
  const preferenceChart = echarts.init(chart.value);
  preferenceChart.setOption({
    animation: false,
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', right: 10, top: 'center' },
    series: [
      {
        name: '消费偏好',
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 1048, name: '餐饮美食' },
          { value: 735, name: '休闲娱乐' },
          { value: 580, name: '购物' },
          { value: 484, name: '生活服务' },
          { value: 300, name: '其他' }
        ]
      }
    ]
  });
});
</script>