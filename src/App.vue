<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <nav class="bg-white shadow-md h-16 flex items-center justify-between px-6 fixed w-full z-50">
      <div class="flex items-center">
        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
        <span class="ml-3 text-xl font-medium">商业数据智能分析平台</span>
      </div>
      <div class="flex items-center space-x-6">
        <button class="!rounded-button flex items-center space-x-2 text-gray-600 hover:text-blue-600">
          <i class="fas fa-bell"></i>
          <span class="text-sm whitespace-nowrap">消息通知</span>
        </button>
        <div class="flex items-center space-x-2">
          <img class="w-8 h-8 rounded-full object-cover" :src="userAvatar" alt="用户头像"/>
          <span class="text-sm text-gray-700">张经理</span>
        </div>
      </div>
    </nav>

    <!-- 左侧菜单 -->
    <div class="fixed left-0 top-16 w-64 h-full bg-white shadow-lg">
      <div class="py-6">
        <div v-for="(item, index) in menuItems" :key="index"
             :class="{'bg-blue-50 border-l-4 border-blue-600': currentMenu === item.id}"
             class="px-6 py-3 cursor-pointer hover:bg-gray-50"
             @click="currentMenu = item.id">
          <div class="flex items-center space-x-3">
            <i :class="item.icon" class="text-lg text-gray-600"></i>
            <span class="text-gray-700">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="ml-64 pt-16 p-8">
      <!-- 用户画像分析 -->
      <div v-if="currentMenu === 'portrait'" class="space-y-6">
        <div class="grid grid-cols-4 gap-6">
          <div v-for="(stat, index) in userStats" :key="index"
               class="bg-white p-6 rounded-lg shadow-sm">
            <div class="text-gray-500 mb-2">{{ stat.label }}</div>
            <div class="text-2xl font-semibold">{{ stat.value }}</div>
            <div class="text-sm text-gray-400 mt-2">
              较上月
              <span :class="stat.trend > 0 ? 'text-green-500' : 'text-red-500'">
                {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
              </span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h3 class="text-lg font-medium mb-4">消费偏好分析</h3>
            <div ref="preferenceChart" class="h-80"></div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h3 class="text-lg font-medium mb-4">用户画像特征</h3>
            <div ref="portraitChart" class="h-80"></div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-lg font-medium mb-4">评论情感分析</h3>
          <div ref="sentimentChart" class="h-80"></div>
        </div>
      </div>

      <!-- 经营决策推荐 -->
      <div v-if="currentMenu === 'business'" class="space-y-6">
        <div class="grid grid-cols-3 gap-6">
          <div v-for="(insight, index) in businessInsights" :key="index"
               class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium">{{ insight.title }}</h3>
              <i :class="insight.icon" class="text-2xl text-blue-600"></i>
            </div>
            <p class="text-gray-600">{{ insight.description }}</p>
            <button class="mt-4 !rounded-button bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 whitespace-nowrap">
              查看详情
            </button>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-lg font-medium mb-4">营业额趋势分析</h3>
          <div ref="revenueChart" class="h-80"></div>
        </div>
      </div>

      <!-- 附近商家推荐 -->
      <div v-if="currentMenu === 'nearby'" class="space-y-6">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium">附近热门商家</h3>
            <div class="flex items-center space-x-4">
              <div class="relative">
                <input type="text" placeholder="搜索商家"
                       class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>
                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
              <select class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option>距离排序</option>
                <option>好评优先</option>
                <option>人气最高</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-6">
            <div v-for="(shop, index) in nearbyShops" :key="index"
                 class="border rounded-lg overflow-hidden">
              <img :src="shop.image" class="w-full h-48 object-cover" :alt="shop.name"/>
              <div class="p-4">
                <h4 class="font-medium mb-2">{{ shop.name }}</h4>
                <div class="flex items-center text-sm text-gray-500 mb-2">
                  <i class="fas fa-map-marker-alt mr-2"></i>
                  <span>{{ shop.distance }}</span>
                </div>
                <div class="flex items-center text-sm">
                  <div class="text-yellow-400">
                    <i class="fas fa-star"></i>
                    <span class="ml-1">{{ shop.rating }}</span>
                  </div>
                  <span class="mx-2 text-gray-300">|</span>
                  <span class="text-gray-500">{{ shop.reviewCount }}条点评</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 好友推荐 -->
      <div v-if="currentMenu === 'friends'" class="space-y-6">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-lg font-medium mb-6">推荐好友</h3>
          <div class="grid grid-cols-4 gap-6">
            <div v-for="(friend, index) in recommendedFriends" :key="index"
                 class="border rounded-lg p-4 text-center">
              <img :src="friend.avatar" class="w-20 h-20 rounded-full mx-auto mb-4 object-cover" :alt="friend.name"/>
              <h4 class="font-medium mb-2">{{ friend.name }}</h4>
              <div class="text-sm text-gray-500 mb-3">{{ friend.title }}</div>
              <div class="flex flex-wrap gap-2 justify-center mb-4">
                <span v-for="(tag, tagIndex) in friend.tags" :key="tagIndex"
                      class="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">
                  {{ tag }}
                </span>
              </div>
              <button class="!rounded-button bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 w-full whitespace-nowrap">
                添加好友
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const currentMenu = ref('portrait');
const userAvatar = 'https://ai-public.mastergo.com/ai/img_res/0026bfd1c3fd32f0eeb5f5b01288bdf0.jpg';

const menuItems = [
  { id: 'portrait', name: '用户画像分析', icon: 'fas fa-user-chart' },
  { id: 'business', name: '经营决策推荐', icon: 'fas fa-chart-line' },
  { id: 'nearby', name: '附近商家推荐', icon: 'fas fa-store' },
  { id: 'friends', name: '好友智能推荐', icon: 'fas fa-users' },
];

const userStats = [
  { label: '消费总额', value: '¥8,546', trend: 12.5 },
  { label: '消费次数', value: '32', trend: 8.3 },
  { label: '好评率', value: '96%', trend: 2.1 },
  { label: '会员等级', value: '黄金', trend: 0 },
];

const businessInsights = [
  {
    title: '销售额预测',
    description: '根据历史数据分析，预计下月销售额将增长15%，建议适当增加库存。',
    icon: 'fas fa-chart-line'
  },
  {
    title: '客流高峰期',
    description: '周末12:00-14:00为客流高峰，建议增加该时段的服务人员配置。',
    icon: 'fas fa-users'
  },
  {
    title: '热销品类',
    description: '海鲜类产品近期销量上升，建议加大采购力度和促销力度。',
    icon: 'fas fa-fire'
  }
];

const nearbyShops = [
  {
    name: '青花瓷餐厅',
    distance: '500m',
    rating: 4.8,
    reviewCount: 1289,
    image: 'https://ai-public.mastergo.com/ai/img_res/24325bbf1e438954dc90ce759d0a6b9f.jpg'
  },
  {
    name: '悦茶空间',
    distance: '800m',
    rating: 4.6,
    reviewCount: 865,
    image: 'https://ai-public.mastergo.com/ai/img_res/87036cb7af3b71d46b897a44d6dec472.jpg'
  },
  {
    name: '星光咖啡',
    distance: '1.2km',
    rating: 4.7,
    reviewCount: 756,
    image: 'https://ai-public.mastergo.com/ai/img_res/1f727e83a8d2c9261831d65fdb84b8fc.jpg'
  }
];

const recommendedFriends = [
  {
    name: '陈思远',
    title: '金融分析师',
    tags: ['美食', '红酒', '高尔夫'],
    avatar: 'https://ai-public.mastergo.com/ai/img_res/2558973ee0627edbf42b37307aa54bfe.jpg'
  },
  {
    name: '林雨晴',
    title: '设计总监',
    tags: ['咖啡', '艺术', '摄影'],
    avatar: 'https://ai-public.mastergo.com/ai/img_res/ad467b203513b3d5ad701bcf6ac1cc8b.jpg'
  },
  {
    name: '王浩然',
    title: '创业投资人',
    tags: ['科技', '创新', '网球'],
    avatar: 'https://ai-public.mastergo.com/ai/img_res/72665600a7f4a12d3487293324164239.jpg'
  },
  {
    name: '张梦琪',
    title: '市场总监',
    tags: ['旅行', '美食', '瑜伽'],
    avatar: 'https://ai-public.mastergo.com/ai/img_res/6bc3faec95c44732ddc90fb694e88ab7.jpg'
  }
];

onMounted(() => {
  // 消费偏好分析图表
  const preferenceChart = echarts.init(document.querySelector('#preferenceChart') as HTMLElement);
  preferenceChart.setOption({
    animation: false,
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center'
    },
    series: [
      {
        name: '消费偏好',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '餐饮美食' },
          { value: 735, name: '休闲娱乐' },
          { value: 580, name: '购物' },
          { value: 484, name: '生活服务' },
          { value: 300, name: '其他' }
        ]
      }
    ]
  });

  // 用户画像特征图表
  const portraitChart = echarts.init(document.querySelector('#portraitChart') as HTMLElement);
  portraitChart.setOption({
    animation: false,
    radar: {
      indicator: [
        { name: '消费能力', max: 100 },
        { name: '美食偏好', max: 100 },
        { name: '生活品质', max: 100 },
        { name: '社交活跃度', max: 100 },
        { name: '休闲娱乐', max: 100 }
      ]
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: [80, 90, 85, 70, 75],
          name: '用户画像',
          areaStyle: {
            color: 'rgba(59, 130, 246, 0.2)'
          },
          lineStyle: {
            color: '#3b82f6'
          },
          itemStyle: {
            color: '#3b82f6'
          }
        }
      ]
    }]
  });

  // 评论情感分析图表
  const sentimentChart = echarts.init(document.querySelector('#sentimentChart') as HTMLElement);
  sentimentChart.setOption({
    animation: false,
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '正面评价',
        type: 'line',
        data: [85, 88, 82, 93, 90, 94],
        smooth: true,
        lineStyle: {
          color: '#10B981'
        },
        itemStyle: {
          color: '#10B981'
        }
      },
      {
        name: '中性评价',
        type: 'line',
        data: [12, 8, 15, 5, 8, 4],
        smooth: true,
        lineStyle: {
          color: '#6B7280'
        },
        itemStyle: {
          color: '#6B7280'
        }
      },
      {
        name: '负面评价',
        type: 'line',
        data: [3, 4, 3, 2, 2, 2],
        smooth: true,
        lineStyle: {
          color: '#EF4444'
        },
        itemStyle: {
          color: '#EF4444'
        }
      }
    ]
  });

  // 营业额趋势图表
  const revenueChart = echarts.init(document.querySelector('#revenueChart') as HTMLElement);
  revenueChart.setOption({
    animation: false,
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [12000, 13200, 14500, 15800, 19000, 23000, 21000],
        type: 'bar',
        itemStyle: {
          color: '#3B82F6'
        }
      }
    ]
  });
});
</script>

<style scoped>
.custom-chart_container {
  width: 100%;
  height: 100%;
}
</style>

