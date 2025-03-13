<template>
  <div class="mt-3 p-6 max-w-5xl mx-auto space-y-8 bg-white rounded-2xl shadow-sm">
    <!-- 查询模块 -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold text-slate-800 tracking-tight">
        <span class="bg-gradient-to-r to-slate-600 bg-clip-text">
          商户经营建议
        </span>
      </h2>
      <div class="flex gap-3 pb-6 border-b border-slate-100">
        <input
            v-model="businessId"
            type="text"
            placeholder="输入商户ID"
            class="flex-1 px-4 py-3 text-slate-700 border border-slate-200 rounded-xl
                   focus:ring-2 focus:ring-blue-100 focus:border-blue-500 placeholder-slate-400
                   transition-all duration-150"
            @keyup.enter="fetchBusinessDetail"
        />
        <button
            @click="fetchBusinessDetail"
            class="px-6 py-3 bg-blue-800 text-white rounded-xl hover:bg-blue-700
                   transition-colors shadow-md hover:shadow-lg active:scale-95"
        >
          {{ isLoading ? '查询中...' : '查询' }}
        </button>
      </div>
    </div>

    <!-- 结果展示 -->
    <div v-if="businessDetail" class="grid grid-cols-2 gap-4">
      <div
          v-for="(value, key) in businessDetail"
          :key="key"
          class="group p-4 rounded-xl border border-slate-100 hover:border-blue-100
               transition-all duration-200 hover:shadow-sm"
          :class="value ? 'bg-white' : 'bg-slate-50'"
      >
        <div class="flex justify-between items-center">
          <span class="font-medium text-slate-700">{{ key }}</span>
          <span
              class="text-sm px-3 py-1 rounded-full font-medium"
              :class="value
              ? 'bg-blue-100 text-blue-800'
              : 'bg-slate-200 text-slate-700'"
          >
            {{ value ? '已达标' : '可优化' }}
          </span>
        </div>

        <!-- 状态指示条 -->
        <div class="mt-2 h-1 rounded-full overflow-hidden bg-slate-100">
          <div
              class="h-full transition-all duration-500"
              :class="value ? 'w-full bg-blue-500' : 'w-1/3 bg-slate-400'"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getBusinessdetail } from '@/api/business';

const businessId = ref('');
const businessDetail = ref(null);
const isLoading = ref(false);
// tailwind.config.js

const fetchBusinessDetail = async () => {
  if (!businessId.value.trim()) return;

  try {
    isLoading.value = true;
    businessDetail.value = null;
    const response = await getBusinessdetail(businessId.value.trim());
    businessDetail.value = response;
  } finally {
    isLoading.value = false;

  }
};
</script>