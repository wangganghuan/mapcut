<template>
  <div class="about" ref="map" style="height: 100vh"></div>
</template>
<script>
import "@/js/basemap";
export default {
  data() {
    return {
      map: "",
      MapContent: "",
    };
  },
  methods: {
    colours() {},
    loadMap() {
      const _this = this;
      // 高德街道
      var GaoDeNormalMap = L.tileLayer.chinaProvider("GaoDe.Normal.Map", {
        maxZoom: 18,
        minZoom: 3,
      });
      // 百度
      var BaiduNormalMap = L.tileLayer.chinaProvider('Baidu.Normal.Map', {
            maxZoom: 18,
            minZoom: 5
        }),
      // 卫星
      BaiduSatelliteMap =  L.tileLayer.chinaProvider('Baidu.Satellite.Map', {
            maxZoom: 18,
            minZoom: 5
        }),
      BaiduSatelliteAnnotion =  L.tileLayer.chinaProvider('Baidu.Satellite.Annotion', {
            maxZoom: 18,
            minZoom: 5
        });
      var gaode_streets = L.layerGroup([GaoDeNormalMap]);
      var baidu_streets = L.layerGroup([BaiduNormalMap]),
        baidu_satellite = L.layerGroup([BaiduSatelliteMap]),
        baidu_hybrid = L.layerGroup([
          BaiduSatelliteMap,
          BaiduSatelliteAnnotion,
        ]);
      var baseLayers = {
        "其他地图": gaode_streets,
        "百度地图(街道)": baidu_streets,
        "百度地图(卫星)": baidu_satellite,
        "百度地图(混合)": baidu_hybrid,
      };
      var overlayLayers = {};
      _this.MapContent = {
         crs: L.CRS.Baidu,
        minZoom: 5,
        maxZoom: 18,
        layers: [baidu_streets],
        attributionControl: false,
        center: [39.89945, 116.40969],
        zoom: 12
      };
      _this.map = L.map(_this.$refs.map, _this.MapContent);
      _this.map.on("baselayerchange", function (res) {
        if (res.name.includes("百度")) {
        } else {
          _this.$router.replace("/positioning");
        }
      });

     var myimage = L.icon({
        iconUrl: require("../assets/logo.png"), //图片url

        iconSize: [20, 20], //设置图片大小 宽度50.高度100
        // 　　iconAnchor: [39.54, 116.23],     //设置定位点的位置。默认为中心  例子中以左上角为定位参考。相当于relative
        popupAnchor: [50, 0], //设置警示框位置 ，以iconAnchor的值进行定位。相当于absolute 例子中的警示框定位到有、右上角。
      });
      var marker = L.marker([39.89945, 116.40969], {
        icon: myimage,
        title: "景山",
        draggable: true,
      }).addTo(this.map);
      L.control.layers(baseLayers).addTo(this.map);
    },
  },
  mounted() {
    this.loadMap();
  },
  destroyed(){
      this.map=null
  }
};
</script>
