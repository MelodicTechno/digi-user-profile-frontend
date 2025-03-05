<template>
  <nav class="bg-white shadow h-16 flex items-center justify-between px-6 fixed w-full z-50">
    <div class="flex items-center">
      <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
      <span class="ml-3 text-xl font-medium">商业数据智能分析平台</span>
    </div>
    <div class="flex items-center space-x-6">
      <button class="!rounded-button flex items-center space-x-2 text-gray-600 hover:text-blue-600">
        <i class="fas fa-bell"></i>
<!--        <span class="text-sm whitespace-nowrap">消息通知</span>-->
      </button>
      <div class="flex items-center space-x-2">
        <img class="w-8 h-8 rounded-full object-cover" :src="userAvatar" alt="用户头像"/>
        <span class="text-sm text-gray-700">拉普兰德</span>
      </div>
    </div>
  </nav>
</template>

<script setup>
const userAvatar = 'https://img.moegirl.tw/common/f/f8/Lappaland.jpg';
</script>