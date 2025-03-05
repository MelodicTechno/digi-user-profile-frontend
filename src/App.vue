<template>
<!--  <div class="min-h-screen bg-gray-50">-->
<!--    <NavBar/>-->
<!--    <SideMenu :currentMenu="currentMenu" @update:currentMenu="currentMenu = $event" />-->
<!--    <div class="ml-64 pt-16 p-8">-->
<!--      <UserPortrait v-if="currentMenu === 'portrait'" />-->
<!--      <BusinessInsights v-if="currentMenu === 'business'" />-->
<!--      <NearbyShops v-if="currentMenu === 'nearby'" />-->
<!--      <FriendRecommend v-if="currentMenu === 'friends'" />-->
<!--    </div>-->
<!--  </div>-->
  <Login/>
</template>

<script setup>
import {ref} from 'vue';
import NavBar from './components/NavBar.vue';
import SideMenu from './components/SideMenu.vue';
import UserPortrait from './components/UserPortrait.vue';
import BusinessInsights from './components/BusinessInsights.vue';
import NearbyShops from './components/NearbyShops.vue';
import FriendRecommend from './components/FriendRecommend.vue';
import Login from './components/Login.vue';

const currentMenu = ref('portrait');
</script>