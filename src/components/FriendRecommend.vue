<template>
  <div class="space-y-6">
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h3 class="text-lg font-medium mb-6">推荐好友</h3>
      <div class="grid grid-cols-4 gap-6">
        <div v-for="(friend, index) in recommendedFriends" :key="index"
             class="border rounded-lg p-4 text-center">
          <img :src="friend.avatar" class="w-20 h-20 rounded-full mx-auto mb-4 object-cover" :alt="friend.name"/>
          <h4 class="font-medium mb-2">{{ friend.name }}</h4>
          <div class="text-sm text-gray-500 mb-3">{{ friend.title }}</div>
          <div class="flex flex-wrap gap-2 justify-center mb-4">
            <span v-for="(tag, tagIndex) in friend.tags" :key="tagIndex"
                  class="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">
              {{ tag }}
            </span>
          </div>
          <button class="!rounded-button bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 w-full whitespace-nowrap">
            添加好友
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const recommendedFriends = [
  {
    name: '陈思远',
    title: '金融分析师',
    tags: ['美食', '红酒', '高尔夫'],
    avatar: 'https://ai-public.mastergo.com/ai/img_res/2558973ee0627edbf42b37307aa54bfe.jpg'
  },
  {
    name: '林雨晴',
    title: '设计总监',
    tags: ['咖啡', '艺术', '摄影'],
    avatar: 'https://ai-public.mastergo.com/ai/img_res/ad467b203513b3d5ad701bcf6ac1cc8b.jpg'
  },
  {
    name: '王浩然',
    title: '创业投资人',
    tags: ['科技', '创新', '网球'],
    avatar: 'https://ai-public.mastergo.com/ai/img_res/72665600a7f4a12d3487293324164239.jpg'
  },
  {
    name: '张梦琪',
    title: '市场总监',
    tags: ['旅行', '美食', '瑜伽'],
    avatar: 'https://ai-public.mastergo.com/ai/img_res/6bc3faec95c44732ddc90fb694e88ab7.jpg'
  }
];
</script>