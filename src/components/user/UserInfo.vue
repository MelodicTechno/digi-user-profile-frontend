<template>
  <div class="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-20">
    <div class="flex items-center space-x-4">
      <img class="w-16 h-16 rounded-full object-cover" :src="userAvatar" alt="用户头像"/>
      <div>
        <h2 class="text-sm text-gray-600">用户ID: {{ userInfo.userid }}</h2>
        <p class="text-sm text-gray-600">用户角色：管理员</p>
      </div>
    </div>
    <div class="mt-6">
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" @click="goBack">返回</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const router = useRouter();

// 用户信息
const userInfo = userStore.userInfo;

// 用户头像链接
const userAvatar = 'https://ihs-hmleadernews.oss-cn-shanghai.aliyuncs.com/efd8c111-dc4a-4db7-941b-2257cecb1687.jpg';

// 返回上一页
const goBack = () => {
  router.go(-1); // 返回上一页
};
</script>