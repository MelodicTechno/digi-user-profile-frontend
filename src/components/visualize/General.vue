<script setup>
import { onMounted, ref } from 'vue';
import { getBusinessRanking, updateBusinessRanking } from '@/api/analyze.js';
import * as echarts from 'echarts';

const rankingData = ref(null);

onMounted(async () => {
  try {
    const response = await getBusinessRanking();
    rankingData.value = response.business_ranking;
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

  const chartDom = document.getElementById('business_ranking');
  const myChart = echarts.init(chartDom);

  const option = {
    title: {
      text: '每个城市最好（评分次数、评分、打卡数）的五家商家'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['评分', '总签到次数', '评论数量', '排名']
    },
    xAxis: {
      type: 'category',
      data: rankingData.value.map(item => item.name)
    },
    yAxis: [
      {
        name: '评分',
        type: 'value',
        min: 0,
        max: 5,
        position: 'left',
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        name: '总签到次数',
        type: 'value',
        position: 'right',
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        name: '评论数量',
        type: 'value',
        position: 'right',
        offset: 80,
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        name: '排名',
        type: 'value',
        position: 'right',
        offset: 160,
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    series: [
      {
        name: '评分',
        type: 'bar',
        yAxisIndex: 0,
        data: rankingData.value.map(item => item.stars),
        itemStyle: {
          color: '#e48593'
        }
      },
      {
        name: '总签到次数',
        type: 'bar',
        yAxisIndex: 1,
        data: rankingData.value.map(item => item.total_checkins),
        itemStyle: {
          color: '#a4c7d2'
        }
      },
      {
        name: '评论数量',
        type: 'bar',
        yAxisIndex: 2,
        data: rankingData.value.map(item => item.review_count),
        itemStyle: {
          color: '#a1a747'
        }
      },
      {
        name: '排名',
        type: 'line',
        yAxisIndex: 3,
        data: rankingData.value.map(item => item.rank),
        itemStyle: {
          color: '#f5c386'
        }
      }
    ]
  };

  myChart.setOption(option);
};
</script>

<template>
  <div class="ml-8 mt-8">
    <div id="business_ranking" style="width: 1200px;height:600px;"></div>
  </div>
  <div class="flex justify-center">
    <button @click="updateData" class="mb-6 w-52 bg-[#f5c386] hover:bg-[#f5c386d9] text-white font-bold py-2 px-4 rounded !important">
      更新业务排名数据
    </button>
  </div>
</template>