<template>
  <div class="space-y-6 mt-6">
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h3 class="text-lg font-medium mb-6">推荐好友</h3>

      <!-- 加载状态 -->
      <div v-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">正在加载推荐好友...</p>
      </div>

      <!-- 错误提示 -->
      <div v-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg">
        加载失败：{{ error }}
      </div>

      <!-- 数据展示 -->
      <div v-if="!loading && !error" class="grid grid-cols-4 gap-6">
        <div
            v-for="(friend, index) in recommendedFriends"
            :key="friend.recommended_user_id"
            class="border rounded-lg p-4 text-center"
        >
          <!-- 静态头像（带默认图） -->
          <img
              :src="getLocalData(index).avatar"
              class="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              :alt="friend.recommend_user_name"
              @error="handleImageError"
          />

          <h4 class="font-medium mb-2">{{ friend.recommend_user_name }}</h4>
          <div class="text-sm text-gray-500 mb-3">
            粉丝数：{{ formatFansNumber(friend.recommend_fans_number) }}
          </div>

          <!-- 静态标签 -->
          <div class="flex flex-wrap gap-2 justify-center mb-4">
            <span
                v-for="(tag, tagIndex) in getLocalData(index).tags"
                :key="tagIndex"
                class="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs"
            >
              {{ tag }}
            </span>
          </div>

          <button
              class="!rounded-button bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 w-full whitespace-nowrap"
              @click="handleAddFriend(friend.recommended_user_id)"
          >
            添加好友
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFriendRecommend } from '@/api/analyze.js';
// 状态管理
const loading = ref(true);
const error = ref(null);
const recommendedFriends = ref([]);

// 本地静态数据模板（优化后的循环结构）
const localTemplates = [
  { tags: ['美食', '红酒', '高尔夫'], avatar: 'https://www.keaitupian.cn/cjpic/frombd/0/253/1152107840/119779555.jpg' },
  { tags: ['咖啡', '艺术', '摄影'], avatar: 'https://www.keaitupian.cn/cjpic/frombd/0/253/1152107840/119779555.jpg' },
  { tags: ['科技', '创新', '网球'], avatar: 'https://www.keaitupian.cn/cjpic/frombd/0/253/1152107840/119779555.jpg' },
  { tags: ['旅行', '美食', '瑜伽'], avatar: 'https://www.keaitupian.cn/cjpic/frombd/0/253/1152107840/119779555.jpg' },
  { tags: ['美食', '红酒', '高尔夫'], avatar: 'https://www.keaitupian.cn/cjpic/frombd/0/253/1152107840/119779555.jpg' },
  { tags: ['咖啡', '艺术', '摄影'], avatar: 'https://www.keaitupian.cn/cjpic/frombd/0/253/1152107840/119779555.jpg' },
  { tags: ['科技', '创新', '网球'], avatar: 'https://www.keaitupian.cn/cjpic/frombd/0/253/1152107840/119779555.jpg' },
  { tags: ['旅行', '美食', '瑜伽'], avatar: 'https://www.keaitupian.cn/cjpic/frombd/0/253/1152107840/119779555.jpg' },
  { tags: ['美食', '红酒', '高尔夫'], avatar: 'https://www.keaitupian.cn/cjpic/frombd/0/253/1152107840/119779555.jpg' },
  { tags: ['咖啡', '艺术', '摄影'], avatar: 'https://www.keaitupian.cn/cjpic/frombd/0/253/1152107840/119779555.jpg' },
];

// 获取本地模板数据（安全循环）
const getLocalData = (index) => {
  return localTemplates[index % localTemplates.length] || localTemplates[0];
};

// 图片加载失败处理
const handleImageError = (e) => {
  e.target.src = '/default-avatar.png';
};

// 粉丝数格式化
const formatFansNumber = (num) => {
  return parseInt(num).toLocaleString();
};

// 添加好友处理
const handleAddFriend = async (userId) => {
  try {
    // 这里添加实际的好友添加逻辑
    console.log('Adding friend:', userId);
  } catch (err) {
    console.error('添加好友失败:', err);
  }
};

// 初始化获取数据
onMounted(async () => {
  try {
    const result = await getFriendRecommend();

    if (result.data?.length) {
      recommendedFriends.value = result.data;
    } else {
      throw new Error('暂无推荐数据');
    }
  } catch (err) {
    error.value = err.message;
    console.error('数据获取失败:', err);
  } finally {
    loading.value = false;
  }
});
</script>