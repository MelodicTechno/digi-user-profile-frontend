<template>
  <nav class="bg-white shadow h-16 flex items-center justify-between px-6 fixed w-full z-50 top-0 left-0 z-50">
    <div class="flex items-center">
      <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
      <span class="ml-3 text-xl font-medium">商业数据智能分析平台</span>
    </div>
    <div class="flex items-center space-x-6">
      <button class="!rounded-button flex items-center space-x-2 text-gray-600 hover:text-blue-600">
        <i class="fas fa-bell"></i>
      </button>
      <div class="flex items-center space-x-2">
        <img class="w-8 h-8 rounded-full object-cover" :src="userAvatar" alt="用户头像"/>
        <span class="text-sm text-gray-700">拉普兰德</span>
      </div>
    </div>
  </nav>
</template>

<script setup>
const userAvatar = 'https://ihs-hmleadernews.oss-cn-shanghai.aliyuncs.com/efd8c111-dc4a-4db7-941b-2257cecb1687.jpg';
</script>