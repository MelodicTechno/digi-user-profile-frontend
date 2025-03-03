<template>
  <div class="space-y-6">
    <div class="grid grid-cols-4 gap-6">
      <div v-for="(stat, index) in userStats" :key="index"
           class="bg-white p-6 rounded-lg shadow-sm">
        <div class="text-gray-500 mb-2">{{ stat.label }}</div>
        <div class="text-2xl font-semibold">{{ stat.value }}</div>
        <div class="text-sm text-gray-400 mt-2">
          较上月
          <span :class="stat.trend > 0 ? 'text-green-500' : 'text-red-500'">
            {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6">
      <PreferenceChart />
      <PortraitChart />
    </div>

    <SentimentChart />
  </div>
</template>

<script setup>
import PreferenceChart from './charts/PreferenceChart.vue';
import PortraitChart from './charts/PortraitChart.vue';
import SentimentChart from './charts/SentimentChart.vue';

const userStats = [
  { label: '消费总额', value: '¥8,546', trend: 12.5 },
  { label: '消费次数', value: '32', trend: 8.3 },
  { label: '好评率', value: '96%', trend: 2.1 },
  { label: '会员等级', value: '黄金', trend: 0 },
];
</script>