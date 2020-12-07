<template>
  <div class="MapWorld">
      <div id="mapDiv" class="MapWorld-map">
    
      </div>
  </div>
</template>
<script>
export default {
  methods: {
    MapShow() {
      var map;
      var zoom = 12;
        map = new T.Map("mapDiv");
        map.centerAndZoom(new T.LngLat(104.06756, 30.6799428454), zoom);
          var marker = new T.Marker(new T.LngLat(104.06756, 30.6799428454));
            //向地图上添加标注
            map.addOverLay(marker);
    },
  },
  mounted(){
      this.MapShow()
  }
};
</script>
<style lang="scss" scoped>
.MapWorld {
  &-map {
    min-height: calc(100vh - 50px);
  }
}
    
</style>