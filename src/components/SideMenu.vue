<template>
  <div class="fixed left-0 top-16 w-64 h-full bg-white shadow-lg">
    <div class="py-6">
      <div v-for="(item, index) in menuItems" :key="index"
           :class="{'bg-blue-50 border-l-4 border-blue-600': currentMenu === item.id}"
           class="px-6 py-3 cursor-pointer hover:bg-gray-50"
           @click="$emit('update:currentMenu', item.id)">
        <div class="flex items-center space-x-3">
          <i :class="item.icon" class="text-lg text-gray-600"></i>
          <span class="text-gray-700">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentMenu: String,
});

const menuItems = [
  { id: 'portrait', name: '用户画像分析', icon: 'fas fa-user-chart' },
  { id: 'business', name: '经营决策推荐', icon: 'fas fa-chart-line' },
  { id: 'nearby', name: '附近商家推荐', icon: 'fas fa-store' },
  { id: 'friends', name: '好友智能推荐', icon: 'fas fa-users' },
];
</script>