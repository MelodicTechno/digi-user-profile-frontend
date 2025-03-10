<template>
  <div class="fixed left-0 top-16 w-64 h-full bg-white shadow-lg">
    <div class="py-6">
      <router-link
          to="/visualize/business"
          class="block mb-4 px-6 py-3 flex items-center space-x-3 hover:bg-gray-100"
          :class="{ 'bg-blue-100 border-l-4 border-blue-500': currentMenu === '/visualize/business' }"
      >
        <i class="fas fa-user-chart text-lg text-gray-600"></i>
        <span class="text-gray-700">商户分析</span>
      </router-link>
      <router-link
          to="/visualize/user"
          class="block mb-4 px-6 py-3 flex items-center space-x-3 hover:bg-gray-100"
          :class="{ 'bg-blue-100 border-l-4 border-blue-500': currentMenu === '/visualize/user' }"
      >
        <i class="fas fa-user-chart text-lg text-gray-600"></i>
        <span class="text-gray-700">用户分析</span>
      </router-link>

      <router-link
          to="/visualize/review"
          class="block mb-4 px-6 py-3 flex items-center space-x-3 hover:bg-gray-100"
          :class="{ 'bg-blue-100 border-l-4 border-blue-500': currentMenu === '/visualize/review' }"
      >
        <i class="fas fa-user-chart text-lg text-gray-600"></i>
        <span class="text-gray-700">评论分析</span>
      </router-link>

      <router-link
          to="/portrait"
          class="block mb-4 px-6 py-3 flex items-center space-x-3 hover:bg-gray-100"
          :class="{ 'bg-blue-100 border-l-4 border-blue-500': currentMenu === '/portrait' }"
      >
        <i class="fas fa-user-chart text-lg text-gray-600"></i>
        <span class="text-gray-700">商户分析参考</span>
      </router-link>
      <router-link
          to="/business"
          class="block mb-4 px-6 py-3 flex items-center space-x-3 hover:bg-gray-100"
          :class="{ 'bg-blue-100 border-l-4 border-blue-500': currentMenu === '/business' }"
      >
        <i class="fas fa-chart-line text-lg text-gray-600"></i>
        <span class="text-gray-700">经营决策推荐</span>
      </router-link>
      <router-link
          to="/visualize/nearby"
          class="block mb-4 px-6 py-3 flex items-center space-x-3 hover:bg-gray-100"
          :class="{ 'bg-blue-100 border-l-4 border-blue-500': currentMenu === '/visualize/nearby' }"
      >
        <i class="fas fa-store text-lg text-gray-600"></i>
        <span class="text-gray-700">附近商家推荐</span>
      </router-link>
      <router-link
          to="/friends"
          class="block mb-4 px-6 py-3 flex items-center space-x-3 hover:bg-gray-100"
          :class="{ 'bg-blue-100 border-l-4 border-blue-500': currentMenu === '/friends' }"
      >
        <i class="fas fa-users text-lg text-gray-600"></i>
        <span class="text-gray-700">好友智能推荐</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'SideMenu',
  setup() {
    const route = useRoute();
    const currentMenu = computed(() => route.path);

    return {
      currentMenu,
    };
  },
};
</script>