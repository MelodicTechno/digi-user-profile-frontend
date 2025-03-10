<script setup>
import { onMounted, ref } from 'vue';
import { getBusinessStatistics, updateStatistics } from '@/api/analyze.js';
import * as echarts from 'echarts';

const statistics = ref(null);

onMounted(async () => {
  try {
    const response = await getBusinessStatistics();
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
  initMostCommonShopChart();
  initShopMostCityChart();
  initShopMostStateChart();
  initCommonWithRateChart();
  initStarsHighCityChart();
  initMostStarsChart();
  initReviewInYearChart();
  initBusinessCheckinRankingChart();
  initCityCheckinRankingChart();
  initCheckinPerHourChart();
  initCheckinPerYearChart();
  initEliteUserPercentChart();
};

const initMostCommonShopChart = () => {
  const chartDom = document.getElementById('most_common_shop');
  const myChart = echarts.init(chartDom);
  const colors = ['#e1dbe9', '#f5c386', '#9cbce3'];
  const option = {
    title: {
      text: '最常见商户'
    },
    tooltip: {},
    legend: {
      data: ['商户数量'],
      itemStyle: {
        color: '#f5c386',
      }
    },
    xAxis: {
      data: statistics.value.most_common_shop.map(item => item.name)
    },
    yAxis: {},
    series: [
      {
        name: '商户数量',
        type: 'bar',
        data: statistics.value.most_common_shop.map((item, index) => ({
          value: item.shop_count,
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

const initShopMostCityChart = () => {
  const chartDom = document.getElementById('shop_most_city');
  const myChart = echarts.init(chartDom);
  const colors = ['#8bbde0', '#b1caa2', '#f9a490'];
  const option = {
    title: {
      text: '商户最多的10个城市'
    },
    tooltip: {},
    legend: {
      data: ['商户数量'],
      itemStyle: {
        color: '#b1caa2',
      }
    },
    xAxis: {
      data: statistics.value.shop_most_city.map(item => item.city),
      label: {
        show: true,
        position: 'top'
      }
    },
    yAxis: {},
    series: [
      {
        name: '商户数量',
        type: 'bar',
        data: statistics.value.shop_most_city.map((item, index) => ({
          value: item.shop_count,
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

const initShopMostStateChart = () => {
  const chartDom = document.getElementById('shop_most_state');
  const myChart = echarts.init(chartDom);
  const colors = ['#6e8734', '#eea079', '#f57e91'];
  const option = {
    title: {
      text: '商户最多的前五个州'
    },
    tooltip: {},
    legend: {
      data: ['商户数量'],
      itemStyle: {
        color: '#eea079',
      }
    },
    xAxis: {
      data: statistics.value.shop_most_state.map(item => item.state)
    },
    yAxis: {},
    series: [
      {
        name: '商户数量',
        type: 'bar',
        data: statistics.value.shop_most_state.map((item, index) => ({
          value: item.shop_count,
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

// 最常见商户及其评均评分
const initCommonWithRateChart = () => {
  const chartDom = document.getElementById('common_with_rate');
  const myChart = echarts.init(chartDom);
  const colors = ['#fa8d55', '#f3e4cf', '#b1c69f'];
  const option = {
    title: {
      text: '最常见商户及其平均评分'
    },
    tooltip: {},
    legend: {
      data: ['平均评分'],
      itemStyle: {
        color: '#f3e4cf',
      }
    },
    xAxis: {
      data: statistics.value.common_with_rate.map(item => item.name)
    },
    yAxis: {},
    series: [
      {
        name: '平均评分',
        type: 'bar',
        data: statistics.value.common_with_rate.map((item, index) => ({
          value: item.avg_stars,
          itemStyle: {
            color: colors[index % colors.length]
          }
        })),
        label: {
          show: true,
          position: 'top',
          formatter: function (params) {
            return params.value.toFixed(2); // 显示2位小数
          }
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initStarsHighCityChart = () => {
  const chartDom = document.getElementById('stars_high_city');
  const myChart = echarts.init(chartDom);
  const colors = ['#6ec02d', '#fdf3e8', '#ff9c7f'];
  const option = {
    title: {
      text: '评分最高的城市'
    },
    tooltip: {},
    legend: {
      data: ['平均评分'],
      itemStyle: {
        color: '#6ec02d',
      }
    },
    xAxis: {
      data: statistics.value.stars_high_city.map(item => item.city)
    },
    yAxis: {},
    series: [
      {
        name: '平均评分',
        type: 'bar',
        data: statistics.value.stars_high_city.map((item, index) => ({
          value: item.average_stars,
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

const initMostStarsChart = () => {
  const chartDom = document.getElementById('most_stars');
  const myChart = echarts.init(chartDom);
  const colors = ['#ff7f74', '#c5d255', '#ffd957'];
  const option = {
    title: {
      text: '收获五星评论最多的商户'
    },
    tooltip: {},
    legend: {
      data: ['五星评论数量'],
      itemStyle: {
        color: '#ff7f74',
      }
    },
    xAxis: {
      data: statistics.value.most_stars.map(item => item.business_name)
    },
    yAxis: {},
    series: [
      {
        name: '五星评论数量',
        type: 'bar',
        data: statistics.value.most_stars.map((item, index) => ({
          value: item.five_stars_counts,
          itemStyle: {
            color: colors[index % colors.length]
          }
        })),
      }
    ]
  };
  myChart.setOption(option);
};

const initReviewInYearChart = () => {
  const chartDom = document.getElementById('review_in_year');
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
      data: statistics.value.review_in_year.map(item => item.year)
    },
    yAxis: {},
    series: [
      {
        name: '评论数',
        type: 'line',
        data: statistics.value.review_in_year.map(item => item.review_count),
        itemStyle: {
          color: '#515792'
        }
      }
    ]
  };
  myChart.setOption(option);
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
      data: statistics.value.elite_user_percent.map(item => item.year)
    },
    yAxis: {},
    series: [
      {
        name: '精英用户比',
        type: 'line',
        data: statistics.value.elite_user_percent.map(item => item.ratio),
        itemStyle: {
          color: '#e4a5b3'
        }
      }
    ]
  };
  myChart.setOption(option);
};
</script>

<template>
  <div class="ml-8 mt-8 grid grid-cols-2 gap-4">
    <div id="most_common_shop" style="width: 600px;height:400px;"></div>
    <div id="shop_most_city" style="width: 600px;height:400px;"></div>
    <div id="shop_most_state" style="width: 600px;height:400px;"></div>
    <div id="common_with_rate" style="width: 600px;height:400px;"></div>
    <div id="stars_high_city" style="width: 600px;height:400px;"></div>
    <div id="most_stars" style="width: 600px;height:400px;"></div>
    <div id="review_in_year" style="width: 600px;height:400px;"></div>
    <div id="business_checkin_ranking" style="width: 600px;height:400px;"></div>
    <div id="city_checkin_ranking" style="width: 600px;height:400px;"></div>
    <div id="checkin_per_hour" style="width: 600px;height:400px;"></div>
    <div id="checkin_per_year" style="width: 600px;height:400px;"></div>
    <div id="elite_user_percent" style="width: 600px;height:400px;"></div>
  </div>
  <div class="flex justify-center">
    <button @click="updateData" class="mb-6 w-52 bg-[#f5c386] hover:bg-[#f5c386d9] text-white font-bold py-2 px-4 rounded !important">
      更新数据
    </button>
  </div>
</template>
