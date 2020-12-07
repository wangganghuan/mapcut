<template>
  <!-- 定位路线管理 -->
  <div class="Positioning">
    <div class="Positioning-map" ref="map"></div>
    <div class="Positioning-menu">
    <div class="Positioning-menu-head">  <el-button type="primary" round size="mini">添加定位路线</el-button></div>
      <el-tree
        :data="data"
       
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="text" size="mini" @click="() => append(data)">
              添加
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)"
            >
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>


<script>
import "@/js/basemap";
export default {
  data() {
    return {
      map: "",
      MapContent: "",
      antPath: null,
      data: [
        {
          id: 1,
          label: "定位路线管理",
         
        },
     
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    append(data) {
      let id = 100;
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
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

      let contentPop = `<div>设备名称:对讲机</div><div>使用者姓名:张三</div><div>电话号码:18727607984</div>`;
      marker.bindPopup(contentPop).openPopup();
      L.control.layers(baseLayers).addTo(this.map);

      // var latlngs = [
      //   [38.89945, 116.40969],
      //   [39.89945, 116.40969],
      //   [38.89945, 129.40969],
      //   [38.89945, 126.40969],
      // ];
      // var polyline = L.polyline(latlngs, { color: "red",noClip:true }).addTo(this.map);

      // // zoom the map to the polyline
      // this.map.fitBounds(polyline.getBounds());
      // this.map.on("click", function (e) {
      //   L.circle(e.latlng, {
      //     radius: 100,
      //     color: "red",
      //     fillColor: "red",
      //     fillOpacity: 1,
      //   }).addTo(_this.map);
      // });
      var points = [];
      var lines = new L.polyline(points);
      var tempLines = new L.polyline([]);
      // this.map.on("click", onClick); //点击地图
      // this.map.on("dblclick", onDoubleClick);
      var longLatList = [
        [38.19945, 116.40969],
        [39.189945, 116.40969],
        [38.189945, 129.40969],
        [38.189945, 126.40969],
      ];

      _this.antPath = L.polyline;
      let gPath = _this.antPathShow(longLatList);

      gPath.addTo(this.map);
      gPath.getLatLngs((e) => {
        console.log(e);
      });

      longLatList.forEach((item) => {
        var marker = L.marker(item, {
          icon: myimage,
          title: "景山",
          draggable: true,
        }).addTo(this.map);
        marker.on("dragend", function (e) {
          item[0] = marker.getLatLng().lat;
          item[1] = marker.getLatLng().lng;
          gPath.remove(_this.map);
          gPath = _this.antPathShow(longLatList);
          gPath.addTo(_this.map);
        });
      });

      // function onClick(e) {
      //   points.push([e.latlng.lat, e.latlng.lng]);
      //   lines.addLatLng(e.latlng);
      //   _this.map.addLayer(lines);
      //   _this.map.addLayer(
      //     L.circle(e.latlng, {
      //       color: "#ff0000",
      //       fillColor: "ff0000",
      //       fillOpacity: 1,
      //     })
      //   );
      //   _this.map.on("mousemove", onMove); //双击地图
      // }
      // function onMove(e) {
      //   if (points.length > 0) {
      //     let ls = [points[points.length - 1], [e.latlng.lat, e.latlng.lng]];
      //     tempLines.setLatLngs(ls);
      //     _this.map.addLayer(tempLines);
      //   }
      // }
      // function onDoubleClick(e) {
      //   L.polyline(points).addTo(_this.map);
      //   points = [];
      //   lines = new L.polyline(points);
      //   _this.map.off("mousemove");
      // }
      // _this.map.on("mouseover", function (e) {
      //   var layer = e.target;

      //   layer.setStyle({
      //     color: "blue",
      //     opacity: 1,
      //     weight: 5,
      //   });
      // });
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
<style lang="scss" scoped>
.Positioning {
  position: relative;
  &-map {
    min-height: calc(100vh - 70px);
    margin-left: 210px;
  }
  &-menu {
    position: absolute;
    left: 0;
    top: 0;
    width: 210px;
    height: 100%;

    z-index: 999;
    &-head{
        text-align: center;
        line-height: 50px;
        border-bottom: 1px solid #f2f2f2;
    }
  }
}
</style>
