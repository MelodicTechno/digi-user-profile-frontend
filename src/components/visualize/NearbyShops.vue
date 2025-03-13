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
          {{ isLoading ? '查询中...' : '确定' }}
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
        </div>
      </div>

      <div class="space-y-4">
        <div
            v-for="(shop, index) in shops"
            :key="index"
            class="border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            @click="goToBusinessDetail(shop.business_id)">
        >
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium text-lg">{{ shop.name }}</h4>
              <div class="flex items-center mt-2 space-x-4 text-sm text-gray-600">
                <div class="flex items-center">
                  <i class="fas fa-map-marker-alt mr-1.5"></i>
                  <span>距您 {{ formatDistance(shop.distance) }}</span>
                </div>
                <div class="flex items-center">
                  <i class="fas fa-star text-yellow-400"></i>
                  <span class="ml-1.5">{{ shop.stars }}星</span>
                </div>
                <div>
                  <span class="text-blue-500">{{ shop.review_count }}条点评</span>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-4 text-sm">
              <div class="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                营业中
              </div>
<!--              <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">-->
<!--                查看详情-->
<!--              </button>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { sendLocationToBackendService } from "@/api/recommend.js";
import { useRouter } from 'vue-router';
import {useBusinessStore} from "@/stores/businessStore.js"; // 添加路由导入


const latitude = ref('');
const longitude = ref('');
const isLoading = ref(false);
const shops = ref([]);
const showMap = ref(false);
const router = useRouter(); // 获取路由实例

// 添加跳转方法
const goToBusinessDetail = (businessId) => {
  const businessStore = useBusinessStore();
  businessStore.setBusinessId(businessId);
  router.push(`/business_info`);
};

const updateShopsByLocation = async () => {
  if (!latitude.value.trim() || !longitude.value.trim()) return;
  try {
    isLoading.value = true;
    const response = await sendLocationToBackendService(
        latitude.value.trim(),
        longitude.value.trim()
    );
    shops.value = response;
  } finally {
    isLoading.value = false;
  }
};
const formatDistance = (distance) => {
  if (distance >= 1000) {
    return `${(distance / 1000).toFixed(1)} 千米`;
  }
  return `${Math.round(distance)} 米`;
};
</script>

<style scoped>
/* 可以添加自定义样式 */
</style>