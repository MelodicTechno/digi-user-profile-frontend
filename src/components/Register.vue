<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">注册</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">用户名</label>
          <input
              type="text"
              id="username"
              v-model="form.username"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">电子邮件</label>
          <input
              type="email"
              id="email"
              v-model="form.email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">密码</label>
          <input
              type="password"
              id="password"
              v-model="form.password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
          />
        </div>
        <div class="mb-6">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">确认密码</label>
          <input
              type="password"
              id="confirmPassword"
              v-model="form.confirmPassword"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
          />
        </div>
        <div>
          <button
              type="submit"
              class="w-full bg-[#f5c386] text-white py-2 px-4 rounded-md hover:bg-[#f5c386d9] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            注册
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import {userRegisterService} from "@/api/user.js";

// 注册
// const register = async () => {
//   console.log(form.value);
//   await userRegisterService(form.value);
// }

// 定义表单数据
const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

// 处理表单提交
const handleSubmit = () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('密码和确认密码不匹配');
    return;
  }
  // 这里可以添加注册逻辑，例如调用API
  console.log('注册信息:', form.value);
  // register();
  alert('注册成功！');
};
</script>
