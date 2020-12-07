<template>
  <div class="AutoNavi">
    <div id="container" class="AutoNavi-map"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      map: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.map = new AMap.Map("container", {
        center: [104.067923463, 30.6799428454],
        resizeEnable: true,
        zoom: 12,
      });
      var marker = new AMap.Marker({
        position: new AMap.LngLat(104.06756, 30.6799428454),
        offset: new AMap.Pixel(-10, -10),
        icon: "//vdata.amap.com/icons/b18/1/2.png", // 添加 Icon 图标 URL
        title: "北京",
      });

     this.map.add(marker);
    },
    destroyMap() {
      this.map && this.map.destroy();
    },
  },
  destroyed() {
    this.destroyMap();
    console.log(1111);
  },
};
</script>
<style lang='scss' scoped>
.AutoNavi {
  &-map {
    min-height: calc(100vh - 50px);
  }
}
</style>