<template>
  <div class="Baidu">
    <div id="map" class="Baidu-map"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    startData() {
      var map = new BMap.Map("map"); // 创建Map实例
      map.centerAndZoom(new BMap.Point(104.067923463, 30.6799428454), 12); // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
      var point = new BMap.Point(104.06756, 30.6799428454);
      var marker = new BMap.Marker(point); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中
    },
  },
  mounted() {
    this.startData();
  },
};
</script>
<style lang="scss" scoped>
.Baidu {
  &-map {
    min-height: calc(100vh - 50px);
  }
}
</style>