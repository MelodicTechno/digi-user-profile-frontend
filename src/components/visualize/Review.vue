<script setup>
import { onMounted, ref } from 'vue';
import { getReviewStatistics, updateReviewStatistics, getWordCloudData, updateReviewData, getReviewData } from '@/api/analyze.js';
import * as echarts from 'echarts';
import 'echarts-wordcloud';

const statistics = ref(null);
const wordCloudData = ref(null);
const relationGraphData = ref(null);

onMounted(async () => {
  try {
    const response = await getReviewStatistics();
    statistics.value = response;
    console.log('Review Statistics:', response);
    const wordCloudResponse = await getWordCloudData();
    wordCloudData.value = wordCloudResponse.word_frequencies;
    console.log('Word Cloud Data:', wordCloudData);
    const relationGraph = await getRelationGraph();
    relationGraphData.value = relationGraph;
    console.log('relationgraph:', relationGraphData);

    initEcharts();
    initWordCloud();
  } catch (error) {
    console.error('Failed to fetch review statistics:', error);
  }
});

const updateData = async () => {
  const confirmed = confirm('确定要更新数据吗？');
  if (confirmed) {
    try {
      const response = await updateReviewStatistics();
      alert('数据更新成功');
      statistics.value = response;
      initEcharts();
    } catch (error) {
      alert('数据更新失败');
      console.error('Failed to update review statistics:', error);
    }
  }
};

const initEcharts = () => {
  if (!statistics.value) return;

  // 初始化所有图表
  initYearReviewCountChart();
  initUserReviewCountChart();
  initTopWordsChart();
  initGraphChart();
  initSummaryChart();
  initPositiveWordsChart();
  initNegativeWordsChart();
};

const initYearReviewCountChart = () => {
  const chartDom = document.getElementById('year_review_count');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '年度评论统计'
    },
    tooltip: {},
    legend: {
      data: ['评论数量']
    },
    xAxis: {
      data: statistics.value.year_review_counts.map(item => item.year)
    },
    yAxis: {},
    series: [
      {
        name: '评论数量',
        type: 'bar',
        data: statistics.value.year_review_counts.map(item => item.review_count),
        itemStyle: {
          color: '#515792'
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initUserReviewCountChart = () => {
  const chartDom = document.getElementById('user_review_count');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '用户评论统计'
    },
    tooltip: {},
    legend: {
      data: ['评论数量']
    },
    xAxis: {
      data: statistics.value.user_review_counts.map(item => item.name)
    },
    yAxis: {},
    series: [
      {
        name: '评论数量',
        type: 'bar',
        data: statistics.value.user_review_counts.map(item => item.review_counts),
        itemStyle: {
          color: '#325d71'
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initTopWordsChart = () => {
  const chartDom = document.getElementById('top_words');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '评论高频词'
    },
    tooltip: {},
    legend: {
      data: ['词频']
    },
    xAxis: {
      data: statistics.value.top_20_words.map(item => item.word)
    },
    yAxis: {},
    series: [
      {
        name: '词频',
        type: 'bar',
        data: statistics.value.top_20_words.map(item => item.count),
        itemStyle: {
          color: '#bf6f87'
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initGraphChart = () => {
  const chartDom = document.getElementById('graph');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '评论关系图',
      left: 'center', // 将标题居中
      top: 'top', // 将标题向上移动
      textStyle: {
        fontSize: 16 // 调整字体大小
      }
    },
    tooltip: {},
    series: [
      {
        name: '评论关系',
        type: 'graph',
        layout: 'force',
        data: relationGraphData.value.nodes.map(node => ({
          name: node.name,
          symbolSize: 10,
          itemStyle: {
            normal: {
              color: '#515792'
            }
          }
        })),
        links: relationGraphData.value.links.map(edge => ({
          source: edge.source,
          target: edge.target,
          value: edge.value
        })),
        lineStyle: {
          color: '#325d71'
        }
      }
    ]
  };
  myChart.setOption(option);
};

const initWordCloud = () => {
  if (!wordCloudData.value) return;

  const chartDom = document.getElementById('word_cloud');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '评论词云图', // 添加标题
      left: 'center', // 标题位置
      textStyle: {
        color: '#333', // 标题颜色
        fontWeight: 'bold' // 标题字体粗细
      }
    },
    series: [{
      type: 'wordCloud',
      shape: 'circle',
      gridSize: 2,
      sizeRange: [12, 60],
      rotationRange: [-90, 90],
      rotationStep: 45,
      textStyle: {
        normal: {
          color: function () {
            return 'rgb(' + [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') + ')';
          }
        },
        emphasis: {
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      data: wordCloudData.value.map(item => ({
        name: item.word,
        value: item.count
      }))
    }]
  };
  myChart.setOption(option);
};
</script>

<template>
  <div class="ml-8 mt-8 grid grid-cols-2 gap-4">
    <div id="year_review_count" style="width: 600px;height:400px;"></div>
    <div id="user_review_count" style="width: 600px;height:400px;"></div>
    <div id="top_words" style="width: 600px;height:400px;"></div>
    <div id="word_cloud" style="width: 600px;height:400px;"></div>
    <div id="summary" style="width: 600px;height:400px;"></div>
    <div id="positive_words" style="width: 600px;height:400px;"></div>
    <div id="negative_words" style="width: 600px;height:400px;"></div>
  </div>
  <div class="flex justify-center">
    <button @click="updateData"
            class="mb-6 w-52 bg-[#f5c386] hover:bg-[#f5c386d9] text-white font-bold py-2 px-4 rounded !important">
      更新评论数据
    </button>
  </div>
</template>