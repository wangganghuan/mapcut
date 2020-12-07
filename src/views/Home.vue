<template>
  <div>
    <div class="about" ref="map" style="height: 100vh"></div>
  </div>
</template>


<script>
import "@/js/basemap";
export default {
  data() {
    return {
      map: "",
      MapContent: "",
      text: "首页",
      antPath: null,
    };
  },
  methods: {
    colours() {},
    loadMap() {
      const _this = this;
      // 谷歌卫星
      var GoogleSatelliteMap = L.tileLayer.chinaProvider(
        "Google.Satellite.Map",
        {
          maxZoom: 23,
          minZoom: 0,
        }
      );
      var GoogleSatelliteAnnotion = L.tileLayer.chinaProvider(
        "Google.Satellite.Annotion",
        {
          maxZoom: 23,
          minZoom: 0,
        }
      );

      // 高德街道
      var GaoDeNormalMap = L.tileLayer.chinaProvider("GaoDe.Normal.Map", {
        maxZoom: 18,
        minZoom: 3,
      });
      // 卫星
      var GaoDeSatelliteMap = L.tileLayer.chinaProvider("GaoDe.Satellite.Map", {
        maxZoom: 18,
        minZoom: 0,
      });
      var GaoDeSatelliteAnnotion = L.tileLayer.chinaProvider(
        "GaoDe.Satellite.Annotion",
        {
          maxZoom: 18,
          minZoom: 0,
        }
      );
      // 天地图
      var TianDiTuNormalMap = L.tileLayer.chinaProvider("TianDiTu.Normal.Map", {
        maxZoom: 18,
        minZoom: 3,
      });
      var TianDiTuNormalla = L.tileLayer.chinaProvider(
        "TianDiTu.Normal.Annotion",
        {
          maxZoom: 18,
          minZoom: 5,
        }
      );
      // 卫星
      var TianDiTuSatelliteMap = L.tileLayer.chinaProvider(
        "TianDiTu.Satellite.Map",
        {
          maxZoom: 18,
          minZoom: 0,
        }
      );
      var TianDiTuSatelliteAnnotion = L.tileLayer.chinaProvider(
        "TianDiTu.Satellite.Annotion",
        {
          maxZoom: 18,
          minZoom: 0,
        }
      );
      // 百度
      var BaiduNormalMap = L.tileLayer.chinaProvider("Baidu.Normal.Map", {
        maxZoom: 18,
        minZoom: 5,
      });
      // 卫星
      var BaiduSatelliteMap = L.tileLayer.chinaProvider("Baidu.Satellite.Map", {
        maxZoom: 18,
        minZoom: 5,
      });
      var BaiduSatelliteAnnotion = L.tileLayer.chinaProvider(
        "Baidu.Satellite.Annotion",
        {
          maxZoom: 18,
          minZoom: 5,
        }
      );

      var google_satellite = L.layerGroup([GoogleSatelliteMap]);
      var google_hybrid = L.layerGroup([
        GoogleSatelliteMap,
        GoogleSatelliteAnnotion,
      ]);

      var gaode_streets = L.layerGroup([GaoDeNormalMap]),
        gaode_satellite = L.layerGroup([GaoDeSatelliteMap]),
        gaode_hybrid = L.layerGroup([
          GaoDeSatelliteMap,
          GaoDeSatelliteAnnotion,
        ]);

      var baidu_streets = L.layerGroup([BaiduNormalMap]),
        baidu_satellite = L.layerGroup([BaiduSatelliteMap]),
        baidu_hybrid = L.layerGroup([
          BaiduSatelliteMap,
          BaiduSatelliteAnnotion,
        ]);
      var tiandi_streets = L.layerGroup([TianDiTuNormalMap, TianDiTuNormalla]),
        tiandi_satellite = L.layerGroup([
          TianDiTuSatelliteMap,
          TianDiTuSatelliteAnnotion,
        ]);

      var baseLayers = {
        "谷歌地图(卫星)": google_satellite,
        "谷歌地图(混合)": google_hybrid,
        "高德地图(街道)": gaode_streets,
        "高德地图(卫星)": gaode_satellite,
        "高德地图(混合)": gaode_hybrid,
        "天地图(街道)": tiandi_streets,
        "天地图(卫星)": tiandi_satellite,
        "百度地图(街道)": baidu_streets,
        "百度地图(卫星)": baidu_satellite,
        "百度地图(混合)": baidu_hybrid,
      };
      var overlayLayers = {};
      _this.MapContent = {
        center: [39.54, 116.23],
        zoom: 8,
        layers: [gaode_streets],
        zoomControl: false,
        worldCopyJump: true,
        zoomSnap: 0.5,
        zoomDelta: 0.5,
        minZoom: 4,
        maxZoom: 18,
        wheelPxPerZoomLevel: 120,
      };
      _this.map = L.map(_this.$refs.map, _this.MapContent);
      _this.map.on("baselayerchange", function (res) {
        _this.map = null;
        if (res.name.includes("百度")) {
          _this.$router.replace("/BaiduMap");
        } else {
        }
      });

      var myimage = L.icon({
        iconUrl: require("../assets/logo.png"), //图片url

        iconSize: [20, 20], //设置图片大小 宽度50.高度100
        // 　　iconAnchor: [39.54, 116.23],     //设置定位点的位置。默认为中心  例子中以左上角为定位参考。相当于relative
        popupAnchor: [0, -10], //设置警示框位置 ，以iconAnchor的值进行定位。相当于absolute 例子中的警示框定位到有、右上角。
      });
      // 图标
      var marker = L.marker([39.89945, 116.40969], {
        icon: myimage,
        title: "景山",
      }).addTo(this.map);
      // 圆形
      // var circle = L.circle([38.89945, 116.40969], {
      //   color: "red",
      //   fillColor: "#f03",
      //   fillOpacity: 0.5,
      //   radius: 5000,
      // }).addTo(this.map);

      // var polygon = L.polygon([
      //   [38.89945, 126.40969],
      //   [37.89945, 136.40969],
      //   [36.89945, 116.40969],
      // ]).addTo(this.map);
      let contentPop = `<div>设备名称:对讲机</div><div>使用者姓名:张三</div><div>电话号码:18727601000</div><div class='lock-div'><button id='lock' class='lock'>锁定</button></div>`;
      marker.bindPopup(contentPop).openPopup();
      L.control.layers(baseLayers).addTo(this.map);
      // marker.on("click", function (e) {
      
      // });
        let lock = document.querySelector("#lock");
        lock.addEventListener("click", function () {
          let center = [39.89945, 116.40969];
        _this.map.setView(center, 5);
        });
    },
    antPathShow(longLatList) {
      this.antPath = L.polyline;
      let Data = this.antPath(longLatList, {
        smoothFactor: 0.1,
        noClip: false,
        paused: false, //暂停  初始化状态
        reverse: false, //方向反转
        delay: 3000, //延迟，数值越大效果越缓慢
        weight: 3, //线宽
        opacity: 1, //透明度
        color: "#000", //颜色
        pulseColor: "#FFFFFF", //块颜色
      });
      return Data;
    },
  },
  mounted() {
    this.loadMap();
  },
};
</script>
<style lang="scss" >
.lock{
      background-color: #1286cc;
    border-color: #1286cc;
  border: 0;
  color: #fff;
  cursor: pointer;
  float: right;
  padding:3px 10px;
  border-radius: 3px;
}
.lock-div{
  margin-top: 10px;
  overflow: hidden;
}
</style>

