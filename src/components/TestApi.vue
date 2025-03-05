<template>
  <div>
    <h1>Test API</h1>
    <button @click="testApiHandler">Call Test API</button>
    <div v-if="response">
      <h2 class="text-2xl font-bold mb-6 text-center">Response:</h2>
      <pre>{{ response }}</pre>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { testApi } from '@/api/analyze.js';

export default {
  setup() {
    const response = ref(null);

    const testApiHandler = async () => {
      try {
        const res = await testApi();
        response.value = res.data; // 假设后端返回的是 JSON 数据
      } catch (error) {
        response.value = `Error: ${error.message}`;
      }
    };

    return { testApiHandler, response };
  }
};
</script>

<style scoped>
button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

pre {
  background-color: #f4f4f4;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>