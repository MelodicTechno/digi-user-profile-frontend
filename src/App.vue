<template>
  <div class="min-h-screen bg-gray-50">
<!--    <NavBar />-->
<!--    <SideMenu />-->
    <div>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import SideMenu from './components/SideMenu.vue';
</script>