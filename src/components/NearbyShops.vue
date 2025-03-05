<template>
  <div class="space-y-6 mt-6">
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-medium">附近热门商家</h3>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input type="text" placeholder="搜索商家"
                   class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>
            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <select class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            <option>距离排序</option>
            <option>好评优先</option>
            <option>人气最高</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-6">
        <div v-for="(shop, index) in nearbyShops" :key="index"
             class="border rounded-lg overflow-hidden">
          <img :src="shop.image" class="w-full h-48 object-cover" :alt="shop.name"/>
          <div class="p-4">
            <h4 class="font-medium mb-2">{{ shop.name }}</h4>
            <div class="flex items-center text-sm text-gray-500 mb-2">
              <i class="fas fa-map-marker-alt mr-2"></i>
              <span>{{ shop.distance }}</span>
            </div>
            <div class="flex items-center text-sm">
              <div class="text-yellow-400">
                <i class="fas fa-star"></i>
                <span class="ml-1">{{ shop.rating }}</span>
              </div>
              <span class="mx-2 text-gray-300">|</span>
              <span class="text-gray-500">{{ shop.reviewCount }}条点评</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const nearbyShops = [
  {
    name: '青花瓷餐厅',
    distance: '500m',
    rating: 4.8,
    reviewCount: 1289,
    image: 'https://ai-public.mastergo.com/ai/img_res/24325bbf1e438954dc90ce759d0a6b9f.jpg'
  },
  {
    name: '悦茶空间',
    distance: '800m',
    rating: 4.6,
    reviewCount: 865,
    image: 'https://ai-public.mastergo.com/ai/img_res/87036cb7af3b71d46b897a44d6dec472.jpg'
  },
  {
    name: '星光咖啡',
    distance: '1.2km',
    rating: 4.7,
    reviewCount: 756,
    image: 'https://ai-public.mastergo.com/ai/img_res/1f727e83a8d2c9261831d65fdb84b8fc.jpg'
  }
];
</script>