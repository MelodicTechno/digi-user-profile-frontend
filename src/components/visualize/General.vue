<script setup>
import { onMounted, ref } from 'vue';
import { getBusinessRanking, updateBusinessRanking } from '@/api/analyze.js';
import * as echarts from 'echarts';

const rankingData = ref(null);

onMounted(async () => {
  try {
    const response = await getBusinessRanking();
    rankingData.value = response;
    console.log('Business Ranking:', response);
    initEcharts();
  } catch (error) {
    console.error('Failed to fetch business ranking:', error);
  }
});

const updateData = async () => {
  const confirmed = confirm('确定要更新数据吗？');
  if (confirmed) {
    try {
      const response = await updateBusinessRanking();
      alert('数据更新成功');
      rankingData.value = response;
      initEcharts();
    } catch (error) {
      alert('数据更新失败');
      console.error('Failed to update business ranking:', error);
    }
  }
};

const initEcharts = () => {
  if (!rankingData.value) return;

  // 初始化所有图表
  initTop5BusinessesChart();
};


const initTop5BusinessesChart = () => {
  const chartDom = document.getElementById('top5_businesses');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '评分最高的前5个商家'
    },
    tooltip: {},
    legend: {
      data: ['评分']
    },
    xAxis: {
      data: rankingData.value.map(item => item.name)
    },
    yAxis: {},
    series: [
      {
        name: '评分',
        type: 'bar',
        data: rankingData.value.map(item => item.stars),
        itemStyle: {
          color: '#a1a747'
        }
      }
    ]
  };
  myChart.setOption(option);
};
</script>

<template>
  <div class="ml-8 mt-8 grid grid-cols-2 gap-4">
    <div id="top5_businesses" style="width: 600px;height:400px;"></div>
  </div>
  <div class="flex justify-center">
    <button @click="updateData" class="mb-6 w-52 bg-[#f5c386] hover:bg-[#f5c386d9] text-white font-bold py-2 px-4 rounded !important">
      更新业务排名数据
    </button>
  </div>
</template>