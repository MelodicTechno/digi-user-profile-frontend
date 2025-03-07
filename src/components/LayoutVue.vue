<template>
  <div>
    <!-- 导航栏 -->
    <nav-bar />
    <!-- 侧边栏 -->
    <side-menu />
    <!-- 主内容区域 -->
    <div class="ml-64 pt-16">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SideMenu from '@/components/SideMenu.vue';

export default {
  name: 'Layout',
  components: {
    NavBar,
    SideMenu
  }
};
</script>