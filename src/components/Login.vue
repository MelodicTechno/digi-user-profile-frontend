<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">登录</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">用户名</label>
          <input
              type="text"
              id="username"
              v-model="loginData.userid"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
          />
        </div>

        <div>
          <button
              type="submit"
              class="w-full bg-[#f5c386] text-white py-2 px-4 rounded-md hover:bg-[#f5c386d9] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            登录
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from "@/router/index.js";

// 注册
// const register = async () => {
//   console.log(form.value);
//   await userRegisterService(form.value);
// }

// 定义登录表单数据
const loginData = ref({
  userid: '',
});

// 处理表单提交
const handleSubmit = () => {
  console.log('loginData:', loginData.value); // 输出当前的登录数据


  router.push('../visualize/business')
  console.log('登录信息:', loginData.value); // 输出登录信息
  // alert('注册成功！');
};
</script>
