<template>
  <div>
    <div>{{ longitude }}, {{ latitude }}</div>
    <!-- 地图容器 -->
    <div ref="mapContainer" style="width: 100%; height: 500px;"></div>
  </div>
</template>

<script>
// 引入echarts库
import echarts from 'echarts'

export default {
  data() {
    return {
      // 经度
      longitude: '',
      // 纬度
      latitude: '',
      // 导入江苏省地图的JSON数据
      jsMap: require("@/libs/mapJson/320000.json"),
      // ECharts的配置项
      chartOption: {
        geo: [
          {
            // 地图名称，这里为江苏省
            map: '江苏',
            // 地图缩放级别
            zoom: 1,
            // 地图上的标签配置
            label: {
              show: true,           // 是否显示标签
              fontSize: 13,         // 标签字体大小
              color: '#333',        // 标签字体颜色
              position: ['50%', '50%'],  // 标签位置
            },
            // 地图区域的样式配置
            itemStyle: {
              areaColor: '#5FC5C1',  // 地图区域颜色
              borderColor: '#fff',   // 地图区域边界颜色
              fontWeight: 700,       // 地图区域字体粗细
              borderWidth: 1,        // 地图区域边界宽度
              shadowColor: "rgba(0, 0, 0, 0.5)", // 阴影颜色
              shadowBlur: 10, // 阴影模糊度
            },
            // 地图区域在强调（hover）状态下的样式配置
            emphasis: {
              itemStyle: {
                label: {
                  color: '#222',       // 强调状态下的标签颜色
                  fontWeight: 700,     // 强调状态下的标签字体粗细
                },
                areaColor: '#2D8F8A',  // 强调状态下的地图区域颜色
                borderColor: '#fff',   // 强调状态下的地图区域边界颜色
              },
            },
          },
        ],
        series: [
          {
            name: "alarmScatter",
            type: "scatter",
            symbol: "pin",
            symbolSize: 45,
            coordinateSystem: "geo",
            data: [],
            label: {
              show: true,
              color: "#ffebdc",
              fontSize: 18,
              formatter: "{@value}"
            },
            itemStyle: {
              color: "#1F94E7",
              opacity: 0.9
            }
          }
        ]
      },
    }
  },
  mounted() {
    // 在组件挂载完成后初始化地图
    this.initChart()
  },
  methods: {
    // 初始化地图
    initChart() {
      // 注册江苏省地图
      echarts.registerMap("江苏", this.jsMap)
      // 初始化ECharts实例，并将地图挂载到指定的容器上
      this.chart = echarts.init(this.$refs.mapContainer)
      // 监听地图点击事件
      this.chart.on('click', this.mapClickHandler)
      // 设置ECharts的配置项
      this.chart.setOption(this.chartOption)
    },
    // 地图点击响应
    mapClickHandler(params) {
      // 从点击位置提取经度和纬度
      let [longitude, latitude] = this.chart.convertFromPixel('geo',
          [params.event.offsetX, params.event.offsetY]);
      this.longitude = longitude
      this.latitude = latitude

      // 在点击位置动态添加一个散点标记
      this.chartOption.series[0].data.push({
        value: [this.longitude, this.latitude, 16],
        name: "点击位置"
      })

      // 更新图表选项并设置到地图上
      this.chart.setOption(this.chartOption)
    }
  },
  beforeDestroy() {
    // 在组件销毁前，释放ECharts实例占用的资源
    if (this.chart) {
      this.chart.dispose()
    }
  },
}
</script>