<template>
  <div class="max-w-4xl mx-auto p-4 min-h-screen">
    <!-- 加载状态 -->
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      <p class="mt-2 text-gray-600">加载中...</p>
    </div>

    <!-- 错误状态 -->
    <div v-if="error" class="text-center py-8 text-red-600">
      <p>加载失败: {{ error }}</p>
      <button
          @click="fetchData"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        重试
      </button>
    </div>

    <!-- 商家信息 -->
    <div v-if="businessInfo" class="space-y-6">
      <!-- 头部信息 -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ businessInfo.name }}</h1>
        <div class="flex items-center gap-2 mb-4">
          <span class="text-yellow-400">★</span>
          <span class="text-gray-600">{{ businessInfo.stars }} 星</span>
        </div>
        <div class="text-gray-600 space-y-1">
          <p>{{ businessInfo.address }}</p>
          <p>{{ businessInfo.city }}, {{ businessInfo.state }} {{ businessInfo.postal_code }}</p>
        </div>
      </div>

      <!-- 营业时间 -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">营业时间</h2>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="(time, day) in businessInfo.hours" :key="day" class="flex justify-between">
            <span class="text-gray-600">{{ day }}:</span>
            <span class="text-gray-800">{{ time }}</span>
          </div>
        </div>
      </div>

      <!-- 分类标签 -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex flex-wrap gap-2">
          <span
              v-for="category in businessInfo.categories"
              :key="category"
              class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
          >
            {{ category }}
          </span>
        </div>
      </div>

      <!-- 评论列表 -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h2 class="text-xl font-semibold mb-6 text-gray-800">用户评价 ({{ reviews.length }})</h2>
        <div class="space-y-6">
          <div
              v-for="review in reviews"
              :key="review.date"
              class="border-b pb-6 last:border-b-0 last:pb-0"
          >
            <div class="flex items-center gap-4 mb-4">
              <div class="flex items-center">
                <span class="text-yellow-400">★</span>
                <span class="ml-1 text-gray-600">{{ review.stars }}.0</span>
              </div>
              <span class="text-gray-400">{{ formatDate(review.date) }}</span>
            </div>
            <p class="text-gray-800 leading-relaxed">{{ review.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBusinessInformation } from '@/api/business'
import {useBusinessStore} from "@/stores/businessStore.js"; // 添加路由导入


const loading = ref(true)
const error = ref(null)
const businessInfo = ref(null)
const reviews = ref([])

const fetchData = async () => {
  const businessStore = useBusinessStore();
  const currentBusinessId = businessStore.businessId;

  if (!currentBusinessId) {
    error.value = "未找到商家ID";
    return;
  }

  loading.value = true;
  try {
    const response = await getBusinessInformation(currentBusinessId);
    const businessData = response[currentBusinessId];
    error.value = null;
    businessInfo.value = businessData.business_info;
    reviews.value = businessData.reviews;
    console.log(reviews.value)
  } catch (err) {
    error.value = "数据加载失败";
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// import { watch } from 'vue';
//
// const businessStore = useBusinessStore();
// watch(
//     () => businessStore.businessId,
//     (newId) => {
//       if (newId) fetchData();
//     }
// );

onMounted(() => {
  fetchData()
})

</script>