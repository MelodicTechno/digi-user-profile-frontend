<template>
  <div class="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-20">
    <div class="flex items-center space-x-4">
      <img class="w-16 h-16 rounded-full object-cover" :src="userAvatar" alt="用户头像"/>
      <div>
        <h2 class="text-xl font-medium">拉普兰德</h2>
        <p class="text-sm text-gray-600">用户角色：管理员</p>
      </div>
    </div>
    <div class="mt-6">
      <p class="text-gray-700">邮箱：lapuland@example.com</p>
      <p class="text-gray-700">电话：123-456-7890</p>
    </div>
    <div class="mt-6">
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" @click="goBack">返回</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const userAvatar = 'https://ihs-hmleadernews.oss-cn-shanghai.aliyuncs.com/efd8c111-dc4a-4db7-941b-2257cecb1687.jpg';
const router = useRouter();

const goBack = () => {
  router.go(-1); // 返回上一页
};
</script>