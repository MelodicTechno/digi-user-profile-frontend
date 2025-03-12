<script setup>
import {onMounted, ref} from 'vue';
import {getUserStatistics, getYearlyStatistics, updateUserStatistics, updateYearlyStatistics} from '@/api/analyze.js';
import * as echarts from 'echarts';
import {format} from 'date-fns';

const userStatistics = ref(null);
const yearlyStatistics = ref(null);
const executionTime = ref(null);

onMounted(async () => {
  try {
    const response = await getUserStatistics();
    userStatistics.value = response;
    console.log('User Statistics:', response);
    initUserEcharts();
  } catch (error) {
    console.error('Failed to fetch user statistics:', error);
  }

  try {
    const startTime = Date.now();
    const response = await getYearlyStatistics();
    yearlyStatistics.value = response.yearly_statistics;
    const endTime = Date.now();
    executionTime.value = format(endTime - startTime, 'yyyy-MM-dd HH:mm:ss');
    console.log('Yearly Statistics:', response);
    initYearlyEcharts();
  } catch (error) {
    console.error('Failed to fetch yearly statistics:', error);
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
  initEliteUserPercentChart();
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

const initEliteUserPercentChart = () => {
  const chartDom = document.getElementById('elite_user_percent');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '精英用户比'
    },
    tooltip: {},
    legend: {
      data: ['精英用户比']
    },
    xAxis: {
      data: userStatistics.value.elite_user_percent.map(item => item.year)
    },
    yAxis: {},
    series: [
      {
        name: '精英用户比',
        type: 'line',
        data: userStatistics.value.elite_user_percent.map(item => item.ratio),
        itemStyle: {
          color: '#e4a5b3'
        }
      }
    ]
  };
  myChart.setOption(option);
};

// 一坨
const updateYearlyData = async () => {
  const confirmed = confirm('确定要更新每年的统计数据吗？');
  if (confirmed) {
    try {
      const startTime = Date.now();
      yearlyStatistics.value = await updateYearlyStatistics();
      const endTime = Date.now();
      executionTime.value = format(endTime - startTime, 'yyyy-MM-dd HH:mm:ss');
      alert('每年的统计数据更新成功');
      initYearlyEcharts();
    } catch (error) {
      alert('每年的统计数据更新失败');
      console.error('Failed to update yearly statistics:', error);
    }
  }
};

const initYearlyEcharts = () => {
  if (!yearlyStatistics.value) return;

  // 初始化每年的统计数据图表
  initYearlyNewUsersChart();
  initYearlyReviewCountChart();
  initYearlyEliteUsersChart();
  initYearlyTipCountChart();
  initYearlyCheckinCountChart();
};

const initYearlyNewUsersChart = () => {
  const chartDom = document.getElementById('yearly_new_users');
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
      data: yearlyStatistics.value.map(item => item.year)
    },
    yAxis: {},
    series: [
      {
        name: '新用户数',
        type: 'line',
        data: yearlyStatistics.value.map(item => item.new_users),
        itemStyle: {
          color: '#f5c386'
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initYearlyReviewCountChart = () => {
  const chartDom = document.getElementById('yearly_review_count');
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
      data: yearlyStatistics.value.map(item => item.year)
    },
    yAxis: {},
    series: [
      {
        name: '评论数',
        type: 'line',
        data: yearlyStatistics.value.map(item => item.review_count),
        itemStyle: {
          color: '#9cbce3'
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initYearlyEliteUsersChart = () => {
  const chartDom = document.getElementById('yearly_elite_users');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '每年的精英用户数'
    },
    tooltip: {},
    legend: {
      data: ['精英用户数']
    },
    xAxis: {
      data: yearlyStatistics.value.map(item => item.year)
    },
    yAxis: {},
    series: [
      {
        name: '精英用户数',
        type: 'line',
        data: yearlyStatistics.value.map(item => item.elite_users),
        itemStyle: {
          color: '#f9a490'
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initYearlyTipCountChart = () => {
  const chartDom = document.getElementById('yearly_tip_count');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '每年的 tip 数'
    },
    tooltip: {},
    legend: {
      data: ['tip 数']
    },
    xAxis: {
      data: yearlyStatistics.value.map(item => item.year)
    },
    yAxis: {},
    series: [
      {
        name: 'tip 数',
        type: 'line',
        data: yearlyStatistics.value.map(item => item.tip_count),
        itemStyle: {
          color: '#b1c69f'
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initYearlyCheckinCountChart = () => {
  const chartDom = document.getElementById('yearly_checkin_count');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '每年的打卡数'
    },
    tooltip: {},
    legend: {
      data: ['打卡数']
    },
    xAxis: {
      data: yearlyStatistics.value.map(item => item.year)
    },
    yAxis: {},
    series: [
      {
        name: '打卡数',
        type: 'line',
        data: yearlyStatistics.value.map(item => item.checkin_count),
        itemStyle: {
          color: '#6ec02d'
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
    <div id="elite_user_percent" style="width: 600px;height:400px;"></div>
  </div>
  <div class="flex justify-center">
    <button @click="updateUserData"
            class="mb-6 w-52 bg-[#f5c386] hover:bg-[#f5c386d9] text-white font-bold py-2 px-4 rounded !important">
      更新用户数据
    </button>
  </div>

  <!-- 一坨 -->
  <div class="ml-8 mt-8 grid grid-cols-2 gap-4">
    <div id="yearly_new_users" style="width: 600px;height:400px;"></div>
    <div id="yearly_review_count" style="width: 600px;height:400px;"></div>
    <div id="yearly_elite_users" style="width: 600px;height:400px;"></div>
    <div id="yearly_tip_count" style="width: 600px;height:400px;"></div>
    <div id="yearly_checkin_count" style="width: 600px;height:400px;"></div>
  </div>
  <div class="flex justify-center">
    <button @click="updateYearlyData"
            class="mb-6 w-52 bg-[#f5c386] hover:bg-[#f5c386d9] text-white font-bold py-2 px-4 rounded !important">
      更新每年的统计数据
    </button>
  </div>

  <!-- 每年的统计数据表格卡片 -->
  <div class="ml-8 mt-8 mr-8 mb-8 bg-white shadow-md rounded-lg p-6">
    <h2 class="text-2xl font-bold mb-4">每年的统计数据表格</h2>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">年份</th>
        <th scope="col" class="px-6 py-3">新用户数</th>
        <th scope="col" class="px-6 py-3">评论数</th>
        <th scope="col" class="px-6 py-3">精英用户数</th>
        <th scope="col" class="px-6 py-3">Tip 数</th>
        <th scope="col" class="px-6 py-3">打卡数</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="stat in yearlyStatistics" :key="stat.year" class="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td class="px-6 py-4">{{ stat.year }}</td>
        <td class="px-6 py-4">{{ stat.new_users }}</td>
        <td class="px-6 py-4">{{ stat.review_count }}</td>
        <td class="px-6 py-4">{{ stat.elite_users }}</td>
        <td class="px-6 py-4">{{ stat.tip_count }}</td>
        <td class="px-6 py-4">{{ stat.checkin_count }}</td>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- 洞察分析和执行时间卡片 -->
  <div class="ml-8 mt-8 mr-8 mb-8 bg-white shadow-md rounded-lg p-6">
    <div>
      <h2 class="text-2xl font-bold mb-4">洞察分析</h2>
      <p class="text-gray-700 dark:text-gray-400">
        从每年的统计数据可以看出，新用户数和评论数逐年增加，表明平台的活跃度和用户参与度在不断提高。精英用户数的增长也反映了平台对高质量用户的吸引力。Tip 数和打卡数的增长则表明用户之间的互动和参与度也在增加。
      </p>
    </div>

    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">执行时间</h2>
      <p class="text-gray-700 dark:text-gray-400">
        数据加载和处理的执行时间为：{{ executionTime }}
      </p>
    </div>
  </div>
</template>