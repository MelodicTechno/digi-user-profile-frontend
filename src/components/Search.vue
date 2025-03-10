<script setup>
import { ref, onMounted } from 'vue';

// 商家数据（模拟）
const businesses = ref([
  { name: '商家A', latitude: 39.9042, longitude: 116.4074, rating: 4.5, distance: 1.2 },
  { name: '商家B', latitude: 39.9080, longitude: 116.4070, rating: 3.8, distance: 2.5 },
  { name: '商家C', latitude: 39.9100, longitude: 116.4100, rating: 4.2, distance: 3.1 },
]);

// 当前经纬度
const latitude = ref(null);
const longitude = ref(null);

// 排序和过滤条件
const sortBy = ref('rating');
const distanceFilter = ref(10);
const ratingFilter = ref(3);

// 过滤后的商家列表
const filteredBusinesses = ref([]);

// 初始化地图
let map;
onMounted(() => {
  initMap();
});

// 初始化地图函数
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 39.9042, lng: 116.4074 }, // 默认位置：北京
    zoom: 12,
  });

  // 地图点击事件
  map.addListener('click', (event) => {
    latitude.value = event.latLng.lat();
    longitude.value = event.latLng.lng();
    updateBusinessList();
  });
}

// 更新商家列表
function updateBusinessList() {
  if (latitude.value && longitude.value) {
    // 模拟根据经纬度获取商家数据
    filteredBusinesses.value = businesses.value.filter(
        (business) =>
            business.distance <= distanceFilter.value &&
            business.rating >= ratingFilter.value
    );

    // 排序
    if (sortBy.value === 'rating') {
      filteredBusinesses.value.sort((a, b) => b.rating - a.rating);
    } else if (sortBy.value === 'distance') {
      filteredBusinesses.value.sort((a, b) => a.distance - b.distance);
    } else if (sortBy.value === 'recommendation') {
      // 根据点评推荐排序（需实现具体逻辑）
    }
  }
}

// 手动输入经纬度
function setManualLocation() {
  if (latitude.value && longitude.value) {
    updateBusinessList();
  } else {
    alert('请输入有效的经纬度');
  }
}

// 应用筛选条件
function applyFilters() {
  updateBusinessList();
}
</script>

<template>
  <div class="container">
    <h1>附近商家推荐</h1>
    <div class="location-input">
      <label for="latitude">纬度:</label>
      <input type="text" v-model="latitude" placeholder="输入纬度" />
      <label for="longitude">经度:</label>
      <input type="text" v-model="longitude" placeholder="输入经度" />
      <button @click="setManualLocation">确定位置</button>
    </div>
    <div id="map" style="height: 300px; width: 100%;"></div>
    <div class="filters">
      <label for="sort">排序方式:</label>
      <select v-model="sortBy">
        <option value="rating">评分</option>
        <option value="distance">距离</option>
        <option value="recommendation">点评推荐</option>
      </select>
      <label for="distance-filter">距离 (km):</label>
      <input
          type="range"
          v-model="distanceFilter"
          min="1"
          max="50"
          @change="applyFilters"
      />
      <span>{{ distanceFilter }}</span>
      <label for="rating-filter">评分:</label>
      <input
          type="range"
          v-model="ratingFilter"
          min="1"
          max="5"
          step="0.1"
          @change="applyFilters"
      />
      <span>{{ ratingFilter }}</span>
    </div>
    <div id="business-list">
      <div v-for="business in filteredBusinesses" :key="business.name" class="business-item">
        <h3>{{ business.name }}</h3>
        <p>评分: {{ business.rating }}</p>
        <p>距离: {{ business.distance }} km</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
}

.location-input,
.filters {
  margin-bottom: 20px;
}

label {
  margin-right: 10px;
}

#map {
  margin-bottom: 20px;
}

#business-list {
  display: flex;
  flex-direction: column;
}

.business-item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.business-item:last-child {
  border-bottom: none;
}
</style>