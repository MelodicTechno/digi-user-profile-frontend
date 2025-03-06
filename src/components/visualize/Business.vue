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
  const option = {
    title: {
      text: '最常见商户'
    },
    tooltip: {},
    legend: {
      data: ['商户数量']
    },
    xAxis: {
      data: statistics.value.most_common_shop.map(item => item.name)
    },
    yAxis: {},
    series: [
      {
        name: '商户数量',
        type: 'bar',
        data: statistics.value.most_common_shop.map(item => item.shop_count)
      }
    ]
  };
  myChart.setOption(option);
};

const initShopMostCityChart = () => {
  const chartDom = document.getElementById('shop_most_city');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '商户最多的10个城市'
    },
    tooltip: {},
    legend: {
      data: ['商户数量']
    },
    xAxis: {
      data: statistics.value.shop_most_city.map(item => item.city)
    },
    yAxis: {},
    series: [
      {
        name: '商户数量',
        type: 'bar',
        data: statistics.value.shop_most_city.map(item => item.shop_count)
      }
    ]
  };
  myChart.setOption(option);
};

const initShopMostStateChart = () => {
  const chartDom = document.getElementById('shop_most_state');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '商户最多的前五个州'
    },
    tooltip: {},
    legend: {
      data: ['商户数量']
    },
    xAxis: {
      data: statistics.value.shop_most_state.map(item => item.state)
    },
    yAxis: {},
    series: [
      {
        name: '商户数量',
        type: 'bar',
        data: statistics.value.shop_most_state.map(item => item.shop_count)
      }
    ]
  };
  myChart.setOption(option);
};

const initCommonWithRateChart = () => {
  const chartDom = document.getElementById('common_with_rate');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '最常见商户及其平均评分'
    },
    tooltip: {},
    legend: {
      data: ['平均评分']
    },
    xAxis: {
      data: statistics.value.common_with_rate.map(item => item.name)
    },
    yAxis: {},
    series: [
      {
        name: '平均评分',
        type: 'bar',
        data: statistics.value.common_with_rate.map(item => item.avg_stars)
      }
    ]
  };
  myChart.setOption(option);
};

const initStarsHighCityChart = () => {
  const chartDom = document.getElementById('stars_high_city');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '评分最高的城市'
    },
    tooltip: {},
    legend: {
      data: ['平均评分']
    },
    xAxis: {
      data: statistics.value.stars_high_city.map(item => item.city)
    },
    yAxis: {},
    series: [
      {
        name: '平均评分',
        type: 'bar',
        data: statistics.value.stars_high_city.map(item => item.average_stars)
      }
    ]
  };
  myChart.setOption(option);
};

const initMostStarsChart = () => {
  const chartDom = document.getElementById('most_stars');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '收获五星评论最多的商户'
    },
    tooltip: {},
    legend: {
      data: ['五星评论数量']
    },
    xAxis: {
      data: statistics.value.most_stars.map(item => item.business_id)
    },
    yAxis: {},
    series: [
      {
        name: '五星评论数量',
        type: 'bar',
        data: statistics.value.most_stars.map(item => item.five_stars_counts)
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
        data: statistics.value.review_in_year.map(item => item.review_count)
      }
    ]
  };
  myChart.setOption(option);
};

const initBusinessCheckinRankingChart = () => {
  const chartDom = document.getElementById('business_checkin_ranking');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '商家打卡数排序'
    },
    tooltip: {},
    legend: {
      data: ['打卡数']
    },
    xAxis: {
      data: statistics.value.business_checkin_ranking.map(item => item.name)
    },
    yAxis: {},
    series: [
      {
        name: '打卡数',
        type: 'bar',
        data: statistics.value.business_checkin_ranking.map(item => item.total_checkins)
      }
    ]
  };
  myChart.setOption(option);
};

const initCityCheckinRankingChart = () => {
  const chartDom = document.getElementById('city_checkin_ranking');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '最喜欢打卡的城市'
    },
    tooltip: {},
    legend: {
      data: ['打卡数']
    },
    xAxis: {
      data: statistics.value.city_checkin_ranking.map(item => item.city)
    },
    yAxis: {},
    series: [
      {
        name: '打卡数',
        type: 'bar',
        data: statistics.value.city_checkin_ranking.map(item => item.total_checkins)
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
        data: statistics.value.checkin_per_hour.map(item => item.checkin_count)
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
        data: statistics.value.checkin_per_year.map(item => item.checkin_count)
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
        data: statistics.value.elite_user_percent.map(item => item.ratio)
      }
    ]
  };
  myChart.setOption(option);
};
</script>

<template>
  <div class=" mt-8">
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
    <button @click="updateData" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      更新数据
    </button>
  </div>
</template>

<style scoped>
button {
  margin-top: 10px;
}
</style>