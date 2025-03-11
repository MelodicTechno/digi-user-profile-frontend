<script setup>
import { onMounted, ref } from 'vue';
import {getCheckinStatistics, updateCheckinStatistics} from '@/api/analyze.js';
import * as echarts from 'echarts';

const statistics = ref(null);

onMounted(async () => {
  try {
    const response = await getCheckinStatistics();
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
      const response = await updateCheckinStatistics();
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
  initBusinessCheckinRankingChart();
  initCityCheckinRankingChart();
  initCheckinPerHourChart();
  initCheckinPerYearChart();
};

const initBusinessCheckinRankingChart = () => {
  const chartDom = document.getElementById('business_checkin_ranking');
  const myChart = echarts.init(chartDom);
  const colors = ['#fa8d55', '#f3e4cf', '#b1c69f'];
  const option = {
    title: {
      text: '商家打卡数排序'
    },
    tooltip: {},
    legend: {
      data: ['打卡数'],
      itemStyle: {
        color: '#fa8d55',
      }
    },
    xAxis: {
      data: statistics.value.business_checkin_ranking.map(item => item.name)
    },
    yAxis: {},
    series: [
      {
        name: '打卡数',
        type: 'bar',
        data: statistics.value.business_checkin_ranking.map((item, index) => ({
          value: item.total_checkins,
          itemStyle: {
            color: colors[index % colors.length]
          }
        })),
        label: {
          show: true,
          position: 'top'
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initCityCheckinRankingChart = () => {
  const chartDom = document.getElementById('city_checkin_ranking');
  const myChart = echarts.init(chartDom);
  const colors = ['#003f60', '#fe701a', '#e3b9a5'];
  const option = {
    title: {
      text: '最喜欢打卡的城市'
    },
    tooltip: {},
    legend: {
      data: ['打卡数'],
      itemStyle: {
        color: '#003f60',
      }
    },
    xAxis: {
      data: statistics.value.city_checkin_ranking.map(item => item.city)
    },
    yAxis: {},
    series: [
      {
        name: '打卡数',
        type: 'bar',
        data: statistics.value.city_checkin_ranking.map((item, index) => ({
          value: item.total_checkins,
          itemStyle: {
            color: colors[index % colors.length]
          }
        })),
        label: {
          show: true,
          position: 'top'
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initCheckinPerHourChart = () => {
  const chartDom = document.getElementById('checkin_per_hour');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '每小时打卡数'
    },
    tooltip: {},
    legend: {
      data: ['打卡数']
    },
    xAxis: {
      data: statistics.value.checkin_per_hour.map(item => item.hour)
    },
    yAxis: {},
    series: [
      {
        name: '打卡数',
        type: 'line',
        data: statistics.value.checkin_per_hour.map(item => item.checkin_count),
        itemStyle: {
          color: '#325d71'
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initCheckinPerYearChart = () => {
  const chartDom = document.getElementById('checkin_per_year');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '每年打卡数'
    },
    tooltip: {},
    legend: {
      data: ['打卡数']
    },
    xAxis: {
      data: statistics.value.checkin_per_year.map(item => item.year)
    },
    yAxis: {},
    series: [
      {
        name: '打卡数',
        type: 'line',
        data: statistics.value.checkin_per_year.map(item => item.checkin_count),
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
    <div id="business_checkin_ranking" style="width: 600px;height:400px;"></div>
    <div id="city_checkin_ranking" style="width: 600px;height:400px;"></div>
    <div id="checkin_per_hour" style="width: 600px;height:400px;"></div>
    <div id="checkin_per_year" style="width: 600px;height:400px;"></div>
  </div>
  <div class="flex justify-center">
    <button @click="updateData" class="mb-6 w-52 bg-[#f5c386] hover:bg-[#f5c386d9] text-white font-bold py-2 px-4 rounded !important">
      更新打卡数据
    </button>
  </div>
</template>
