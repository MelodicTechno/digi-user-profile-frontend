<template>
  <div class="space-y-6 mt-6">
    <!-- 经纬度输入框和地图按钮 -->
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <div class="flex items-center space-x-4 mb-6">
        <div class="relative">
          <input
              type="text"
              v-model="latitude"
              placeholder="输入纬度"
              class="pl-4 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <div class="relative">
          <input
              type="text"
              v-model="longitude"
              placeholder="输入经度"
              class="pl-4 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <button
            @click="updateShopsByLocation"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          确定位置
        </button>
        <button
            @click="showMap = !showMap"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        >
          地图选点
        </button>
      </div>

      <!-- 地图容器 -->
      <div v-if="showMap" id="map" class="h-96 w-full rounded-lg overflow-hidden"></div>
    </div>

    <!-- 商家列表 -->
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-medium">附近热门商家</h3>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input
                type="text"
                placeholder="搜索商家"
                class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <select
              v-model="sortBy"
              class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="distance">距离排序</option>
            <option value="rating">好评优先</option>
            <option value="reviewCount">人气最高</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-6">
        <div
            v-for="(shop, index) in sortedShops"
            :key="index"
            class="border rounded-lg overflow-hidden"
        >
          <img :src="shop.image" class="w-full h-48 object-cover" :alt="shop.name" />
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
import { ref, computed, onMounted } from 'vue';
import axios from "axios";
import {sendLocationToBackendService} from "@/api/recommend.js";

// 商家数据（模拟）
const nearbyShops = ref([
  {
    name: '青花瓷餐厅',
    distance: '500m',
    rating: 4.8,
    reviewCount: 1289,
    image: 'https://ai-public.mastergo.com/ai/img_res/24325bbf1e438954dc90ce759d0a6b9f.jpg',
  },
  {
    name: '悦茶空间',
    distance: '800m',
    rating: 4.6,
    reviewCount: 865,
    image: 'https://example.com/image2.jpg',
  },
  {
    name: '星光咖啡',
    distance: '1.2km',
    rating: 4.7,
    reviewCount: 756,
    image: 'https://example.com/image3.jpg',
  },
]);

// 经纬度输入
const latitude = ref(null);
const longitude = ref(null);

// 排序方式
const sortBy = ref('distance');

// 是否显示地图
const showMap = ref(false);

// 地图实例
let map;

// 初始化地图
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.0902, lng: -95.7129 }, // 美国中心位置
    zoom: 4, // 缩放级别
  });

  // 地图点击事件
  map.addListener('click', (event) => {
    latitude.value = event.latLng.lat().toFixed(6);
    longitude.value = event.latLng.lng().toFixed(6);
  });
}

// 根据经纬度更新商家列表并发送到后端
function updateShopsByLocation() {
  if (latitude.value && longitude.value) {
    // 模拟根据经纬度更新商家数据
    nearbyShops.value = [
      {
        name: '青花瓷餐厅',
        distance: '500m',
        rating: 4.8,
        reviewCount: 1289,
        image: 'https://example.com/image1.jpg',
      },
      {
        name: '悦茶空间',
        distance: '800m',
        rating: 4.6,
        reviewCount: 865,
        image: 'https://example.com/image2.jpg',
      },
      {
        name: '星光咖啡',
        distance: '1.2km',
        rating: 4.7,
        reviewCount: 756,
        image: 'https://example.com/image3.jpg',
      },
    ];

    // 将经纬度数据发送到后端
    sendLocationToBackend(latitude.value, longitude.value);
  } else {
    alert('请输入有效的经纬度');
  }
}

// 定义一个异步函数
const sendLocationToBackend = async (latitude,longitude) => {
  try {
    // 调用异步服务函数并等待结果
    const res = await sendLocationToBackendService(latitude, longitude);
    console.log(res); // 打印返回的数据
  } catch (error) {
    console.error('请求失败:', error); // 捕获并处理错误
  }
};

// 排序后的商家列表
const sortedShops = computed(() => {
  return [...nearbyShops.value].sort((a, b) => {
    if (sortBy.value === 'distance') {
      return parseFloat(a.distance) - parseFloat(b.distance);
    } else if (sortBy.value === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy.value === 'reviewCount') {
      return b.reviewCount - a.reviewCount;
    }
    return 0;
  });
});

// 监听 showMap 变化，初始化地图
onMounted(() => {
  if (showMap.value) {
    initMap();
  }
});
</script>

<style scoped>
/* 样式保持不变 */
</style>