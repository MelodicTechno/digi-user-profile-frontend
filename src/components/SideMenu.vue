<template>
  <div class="fixed left-0 top-16 w-64 h-full bg-white shadow-lg">
    <div class="py-6">
      <router-link to="/portrait" class="block mb-4bg-blue-50 border-l-4 border-blue-600 hover:border-blue-700">
        <div class="flex items-center space-x-3">
          <div class="text-lg text-gray-600">
            用户画像分析
          </div>
        </div>
      </router-link>
      <router-link to="/business" class="block mb-4bg-blue-50 border-l-4 border-blue-600 hover:border-blue-700">
        <div class="flex items-center space-x-3">
          <div class="text-lg text-gray-600">
            经营决策推荐
          </div>
        </div>
      </router-link>
      <router-link to="/nearby" class="block mb-4bg-blue-50 border-l-4 border-blue-600 hover:border-blue-700">
        <div class="flex items-center space-x-3">
          <div class="text-lg text-gray-600">
            附近商家推荐
          </div>
        </div>
      </router-link>
      <router-link to="/friends" class="block mb-4bg-blue-50 border-l-4 border-blue-600 hover:border-blue-700">
        <div class="flex items-center space-x-3">
          <div class="text-lg text-gray-600">
            好友智能推荐
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
};
</script>