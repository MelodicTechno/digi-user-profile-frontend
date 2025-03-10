<script setup>
import { onMounted, ref } from 'vue';
import { getScoreStatistics, updateScoreStatistics } from '@/api/analyze.js';
import * as echarts from 'echarts';

const statistics = ref(null);

onMounted(async () => {
  try {
    const response = await getScoreStatistics();
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
      const response = await updateScoreStatistics();
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
  initStarsDistributionChart();
  initReviewInWeekChart();
  initTop5BusinessesChart();
};

const initStarsDistributionChart = () => {
  const chartDom = document.getElementById('stars_distribution');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '评分分布'
    },
    tooltip: {},
    legend: {
      data: ['评分数量']
    },
    xAxis: {
      data: statistics.value.stars_dist.map(item => item.rating)
    },
    yAxis: {},
    series: [
      {
        name: '评分数量',
        type: 'bar',
        data: statistics.value.stars_dist.map(item => item.review_count),
        itemStyle: {
          color: '#515792'
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initReviewInWeekChart = () => {
  const chartDom = document.getElementById('review_in_week');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '每周各天的评分次数'
    },
    tooltip: {},
    legend: {
      data: ['评分次数']
    },
    xAxis: {
      data: statistics.value.review_in_week.map(item => item.weekday_name)
    },
    yAxis: {},
    series: [
      {
        name: '评分次数',
        type: 'line',
        data: statistics.value.review_in_week.map(item => item.review_count),
        itemStyle: {
          color: '#325d71'
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initTop5BusinessesChart = () => {
  const chartDom = document.getElementById('top5_businesses');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '5星评价最多的前5个商家'
    },
    tooltip: {},
    legend: {
      data: ['5星评价数量']
    },
    xAxis: {
      data: statistics.value.top5_businesses.map(item => item.business_id)
    },
    yAxis: {},
    series: [
      {
        name: '5星评价数量',
        type: 'bar',
        data: statistics.value.top5_businesses.map(item => item.five_star_count),
        itemStyle: {
          color: '#bf6f87'
        }
      }
    ]
  };
  myChart.setOption(option);
};
</script>

<template>
  <div class="ml-8 mt-8 grid grid-cols-2 gap-4">
    <div id="stars_distribution" style="width: 600px;height:400px;"></div>
    <div id="review_in_week" style="width: 600px;height:400px;"></div>
    <div id="top5_businesses" style="width: 600px;height:400px;"></div>
  </div>
  <div class="flex justify-center">
    <button @click="updateData" class="mb-6 w-52 bg-[#f5c386] hover:bg-[#f5c386d9] text-white font-bold py-2 px-4 rounded !important">
      更新评分数据
    </button>
  </div>
</template>