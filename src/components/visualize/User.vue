<script setup>
import { onMounted, ref } from 'vue';
import { getUserStatistics, updateUserStatistics } from '@/api/analyze.js';
import * as echarts from 'echarts';

const userStatistics = ref(null);

onMounted(async () => {
  try {
    const response = await getUserStatistics();
    userStatistics.value = response;
    console.log('User Statistics:', response);
    initUserEcharts();
  } catch (error) {
    console.error('Failed to fetch user statistics:', error);
  }
});

const updateUserData = async () => {
  const confirmed = confirm('确定要更新用户数据吗？');
  if (confirmed) {
    try {
      const response = await updateUserStatistics();
      alert('用户数据更新成功');
      userStatistics.value = response;
      initUserEcharts();
    } catch (error) {
      alert('用户数据更新失败');
      console.error('Failed to update user statistics:', error);
    }
  }
};

const initUserEcharts = () => {
  if (!userStatistics.value) return;

  // 初始化所有用户相关的图表
  initNewUserEveryYearChart();
  initReviewCountChart();
  initFansMostChart();
  // initUserEveryYearChart();
  initReviewCountYearChart();
  initTotalAndSilentChart();
};

const initNewUserEveryYearChart = () => {
  const chartDom = document.getElementById('new_user_every_year');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '每年新加入的用户数量'
    },
    tooltip: {},
    legend: {
      data: ['新用户数量']
    },
    xAxis: {
      data: userStatistics.value.new_user_every_year.map(item => item.year)
    },
    yAxis: {},
    series: [
      {
        name: '新用户数量',
        type: 'line',
        data: userStatistics.value.new_user_every_year.map(item => item.user_count),
        itemStyle: {
          color: '#f5c386'
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initReviewCountChart = () => {
  const chartDom = document.getElementById('review_count');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '评论达人'
    },
    tooltip: {},
    legend: {
      data: ['评论数量']
    },
    xAxis: {
      data: userStatistics.value.review_count.map(item => item.name)
    },
    yAxis: {},
    series: [
      {
        name: '评论数量',
        type: 'bar',
        data: userStatistics.value.review_count.map(item => item.review_count),
        itemStyle: {
          color: '#9cbce3'
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initFansMostChart = () => {
  const chartDom = document.getElementById('fans_most');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '人气最高的用户（粉丝数）'
    },
    tooltip: {},
    legend: {
      data: ['粉丝数']
    },
    xAxis: {
      data: userStatistics.value.fans_most.map(item => item.name)
    },
    yAxis: {},
    series: [
      {
        name: '粉丝数',
        type: 'bar',
        data: userStatistics.value.fans_most.map(item => item.fans),
        itemStyle: {
          color: '#f9a490'
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initUserEveryYearChart = () => {
  const chartDom = document.getElementById('user_every_year');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '每年的新用户数'
    },
    tooltip: {},
    legend: {
      data: ['新用户数']
    },
    xAxis: {
      data: userStatistics.value.user_every_year.map(item => item.year)
    },
    yAxis: {},
    series: [
      {
        name: '新用户数',
        type: 'line',
        data: userStatistics.value.user_every_year.map(item => item.new_user),
        itemStyle: {
          color: '#eea079'
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initReviewCountYearChart = () => {
  const chartDom = document.getElementById('review_count_year');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '每年的评论数'
    },
    tooltip: {},
    legend: {
      data: ['评论数']
    },
    xAxis: {
      data: userStatistics.value.review_count_year.map(item => item.year)
    },
    yAxis: {},
    series: [
      {
        name: '评论数',
        type: 'line',
        data: userStatistics.value.review_count_year.map(item => item.review),
        itemStyle: {
          color: '#b1c69f'
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initTotalAndSilentChart = () => {
  const chartDom = document.getElementById('total_and_silent');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '每年的总用户数和沉默用户数'
    },
    tooltip: {},
    legend: {
      data: ['总用户数', '沉默用户数']
    },
    xAxis: {
      data: userStatistics.value.total_and_silent.map(item => item.year)
    },
    yAxis: {},
    series: [
      {
        name: '总用户数',
        type: 'line',
        data: userStatistics.value.total_and_silent.map(item => item.total_users),
        itemStyle: {
          color: '#6ec02d'
        }
      },
      {
        name: '沉默用户数',
        type: 'line',
        data: userStatistics.value.total_and_silent.map(item => item.silent_users),
        itemStyle: {
          color: '#ff9c7f'
        }
      }
    ]
  };
  myChart.setOption(option);
};
</script>

<template>
  <div class="ml-8 mt-8 grid grid-cols-2 gap-4">
    <div id="new_user_every_year" style="width: 600px;height:400px;"></div>
    <div id="review_count" style="width: 600px;height:400px;"></div>
    <div id="fans_most" style="width: 600px;height:400px;"></div>
    <!-- <div id="user_every_year" style="width: 600px;height:400px;"></div> -->
    <div id="review_count_year" style="width: 600px;height:400px;"></div>
    <div id="total_and_silent" style="width: 600px;height:400px;"></div>
  </div>
  <div class="flex justify-center">
    <button @click="updateUserData"
            class="mb-6 w-52 bg-[#f5c386] hover:bg-[#f5c386d9] text-white font-bold py-2 px-4 rounded !important">
      更新用户数据
    </button>
  </div>
</template>