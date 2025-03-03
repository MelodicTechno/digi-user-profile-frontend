<template>
  <div class="space-y-6">
    <div class="grid grid-cols-3 gap-6">
      <div v-for="(insight, index) in businessInsights" :key="index"
           class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium">{{ insight.title }}</h3>
          <i :class="insight.icon" class="text-2xl text-blue-600"></i>
        </div>
        <p class="text-gray-600">{{ insight.description }}</p>
        <button class="mt-4 !rounded-button bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 whitespace-nowrap">
          查看详情
        </button>
      </div>
    </div>

    <RevenueChart />
  </div>
</template>

<script setup>
import RevenueChart from './charts/RevenueChart.vue';

const businessInsights = [
  {
    title: '销售额预测',
    description: '根据历史数据分析，预计下月销售额将增长15%，建议适当增加库存。',
    icon: 'fas fa-chart-line'
  },
  {
    title: '客流高峰期',
    description: '周末12:00-14:00为客流高峰，建议增加该时段的服务人员配置。',
    icon: 'fas fa-users'
  },
  {
    title: '热销品类',
    description: '海鲜类产品近期销量上升，建议加大采购力度和促销力度。',
    icon: 'fas fa-fire'
  }
];
</script>