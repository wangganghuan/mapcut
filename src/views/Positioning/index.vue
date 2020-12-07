<template>
  <!-- 定位路线管理 -->
  <div class="Positioning">
    <div class="Positioning-menu">
      <div class="Positioning-menu-head">
        <el-button type="primary" round size="mini" @click="addButton"
          >添加管廊</el-button
        >
      </div>
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :props="defaultProps"
      >
        <div class="Positioning-tree-node" slot-scope="{ node, data }">
          <span class="Positioning-tree-text" @click="handleNodeClick(data)">{{
            data.name || data.routeName
          }}</span>
          <span class="Positioning-tree-button">
            <el-button
              type="text"
              size="mini"
              @click="() => append(data, '添加')"
              v-if="data.routes"
            >
              添加
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => append(data, '修改')"
              v-if="!data.routes"
            >
              修改
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => handleNodeClick(data, '修改')"
              v-if="!data.routes"
            >
              修改线路
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)"
            >
              删除
            </el-button>
          </span>
        </div>
      </el-tree>
    </div>
    <div class="Positioning-map" ref="map"></div>
    <div class="Positioning-button" ref="button">
      <el-button type="primary" @click="save">保存点位</el-button>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      @close="close('取消')"
    >
      <add-path v-if="addShow" @close="close" />
      <add-wireh v-if="WirehShow" @close="close" :singleData="singleData" />
      <add-dot
        v-if="DotShow"
        @close="close"
        :DotData="DotData"
        :singleDot="singleDot"
        :start="start"
      />
    </el-dialog>
  </div>
</template>


<script>
import "@/js/basemap";
import addPath from "./addPath";
import addWireh from "./addWireh";
import addDot from "./addDot";
import {
  positioningShow,
  positioningDelete,
  positioningDeleteRoute,
  positioningbindAP,
  positioningGetAPs,
} from "@/api/positioning";
export default {
  data() {
    return {
      defaultProps: {
        children: "routes",
        label: "name",
      },

      MapText: "高德地图(街道)",
      // 提交数据内容
      contentDATA: null,
      gatherData: [],
      latlng: null,
      DotShow: false,
      dialogTitle: null,
      addShow: false,
      WirehShow: false,
      dialogVisible: false,
      map: "",
      MapContent: "",
      antPath: null,
      data: [],
      singleData: null,
      DotData: null,
      locationData: [],
      gPath: null,
      latlngs: null,
      markers: [],
      longLatList: [],
      singleDot: null,
      start: null,
      myimage: L.icon({
        iconUrl: require("@/assets/dot.png"), //图片url
        iconSize: [15, 15], //设置图片大小 宽度50.高度100
        popupAnchor: [0, -10], //设置警示框位置 ，以iconAnchor的值进行定位。相当于absolute 例子中的警示框定位到有、右上角。
      }),
      myimage1: L.icon({
        iconUrl: require("@/assets/dotk.png"), //图片url
        iconSize: [15, 15], //设置图片大小 宽度50.高度100
        popupAnchor: [0, -10], //设置警示框位置 ，以iconAnchor的值进行定位。相当于absolute 例子中的警示框定位到有、右上角。
      }),
    };
  },
  methods: {
    handleNodeClick(data, content) {
      this.contentDATA = data;
      this.markers = [];
      let _this = this;
      this.locationData = [];
      this.gatherData = [];
      this.DotData = null;
      _this.eliminate();
      let update = false;
      if (data.routeId) {
        if (content == "修改") {
          this.DotData = data;
          update = true;
        }

        let text = "";
        text = this.mapText();
        let prams = {
          reference: text,
          id: data.routeId,
        };

        positioningGetAPs(prams).then((res) => {
          if (!res) {
            this.$refs.button.style.display = "none";
            let center = [37.94886815, 104.8949553];
            this.map.setView(center, 5);
            return;
          }
          let center = [res[0].aplat, res[0].aplng];
          this.map.setView(center, 8);
          if (content == "修改") {
            this.$refs.button.style.display = "block";
          }else{
             this.$refs.button.style.display = "none";
          }

          _this.gatherData = res;

          res.forEach((item, index) => {
            let dataContent = [item.aplat, item.aplng, item];

            _this.locationData.push(dataContent);
          });
          this.froData(false, update);
        });
      } else {
        this.$refs.button.style.display = "none";
      }
    },
    save() {
      let aplist = JSON.stringify(this.gatherData);
      let text = "";
      text = this.mapText();
      let prams = {
        id: this.DotData.routeId,
        reference: text,
        aplist,
      };
      positioningbindAP(prams).then((res) => {
        this.$refs.button.style.display = "none";
        this.DotData = null;
        this.eliminate();
        this.markers = [];
        this.gatherData = [];
        this.locationData = [];
        this.$message({
          type: "success",
          message: "操作成功!",
        });
      });
    },
    ShowData() {
      positioningShow().then((res) => {
        this.data = res;
      });
    },
    addButton() {
      this.dialogTitle = "添加管廊";
      this.addShow = true;
      this.dialogVisible = true;
    },
    // 渲染点
    dot(latlng, prams, update) {
      let updates = true;
      if (!update) {
        updates = update;
      }
      let _this = this;
      var marker = L.marker(latlng, {
        icon: prams.aptype == 0 ? _this.myimage : _this.myimage1,
        title: `${prams.apname}`,
        draggable: updates ? true : false,
      });

      this.markers.push(marker);

      _this.latlngs = L.layerGroup(_this.markers).addTo(_this.map);
      return marker;
    },
    close(content, prams, son) {
      let _this = this;
      if (content == "删除") {
        this.gatherData = [];
        this.dialogVisible = false;
        this.addShow = false;
        this.WirehShow = false;
        this.DotShow = false;
        this.locationData.splice(prams, 1);
        this.eliminate();
        _this.markers = [];
        // 线
        this.froData(true, true);
        return;
      }
      if (content != "取消" && content != "成功" && content != "修改") {
        this.ShowData();
      } else if (content == "成功") {
        // 点内容
        this.dot(this.latlng, prams);
        // 渲染页面点位
        this.gatherData.push(prams);
        let data = [this.latlng.lat, this.latlng.lng, prams];
        this.locationData.push(data);
        if (this.locationData.length > 1) {
          this.$refs.button.style.display = "block";
          _this.eliminate();
          _this.markers = [];
          _this.froData(false, true);
        }
      } else if (content == "修改") {
        _this.markers = [];
        this.gatherData[prams.index] = prams;
        if (son) {
          this.gatherData.splice(this.start[2].index, 0, son);
          let data = [son.aplat, son.aplng, son];
          _this.locationData.splice(this.start[2].index, 0, data);
        }
        this.eliminate();

        this.froData(false, true);
      }
      this.dialogVisible = false;
      this.addShow = false;
      this.WirehShow = false;
      this.DotShow = false;
    },
    append(data, text) {
      if (text == "添加") {
        this.dialogTitle = "添加路线";
      } else {
        this.dialogTitle = "修改路线";
      }
      this.singleData = JSON.parse(JSON.stringify(data));
      this.dialogVisible = true;
      this.WirehShow = true;
    },

    remove(node, data) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (data.routes) {
            const prams = { id: data.id };
            positioningDelete(prams).then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.ShowData();
            });
          } else {
            const prams = { id: data.routeId };
            positioningDeleteRoute(prams).then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.eliminate();
              this.$refs.button.style.display = "none";
              this.ShowData();
            });
          }
        })
        .catch(() => {});
    },
    // 地图
    tileLayer(text) {
      let data = L.tileLayer.chinaProvider(text, {
        maxZoom: 23,
        minZoom: 0,
      });
      return data;
    },
    loadMap() {
      const _this = this;
      // 谷歌卫星
      var GoogleSatelliteMap = this.tileLayer("Google.Satellite.Map");
      var GoogleSatelliteAnnotion = this.tileLayer("Google.Satellite.Annotion");
      // 高德街道
      var GaoDeNormalMap = this.tileLayer("GaoDe.Normal.Map");
      // 卫星
      var GaoDeSatelliteMap = this.tileLayer("GaoDe.Satellite.Map");
      var GaoDeSatelliteAnnotion = this.tileLayer("GaoDe.Satellite.Annotion");
      // 天地图
      var TianDiTuNormalMap = this.tileLayer("TianDiTu.Normal.Map");
      var TianDiTuNormalla = this.tileLayer("TianDiTu.Normal.Annotion");
      // 卫星
      var TianDiTuSatelliteMap = this.tileLayer("TianDiTu.Satellite.Map");
      var TianDiTuSatelliteAnnotion = this.tileLayer(
        "TianDiTu.Satellite.Annotion"
      );
      // 百度
      var BaiduNormalMap = this.tileLayer("Baidu.Normal.Map");
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
      var baidu_streets = L.layerGroup([BaiduNormalMap]);
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
        百度地图: baidu_streets,
      };
      var overlayLayers = {};
      _this.MapContent = {
        center: [37.94886815, 104.8949553],
        zoom: 5,
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
        _this.MapText = res.name;

        if (res.name.includes("百度")) {
          _this.$router.replace("/BaiduMap");
        } else {
        }
      });

      var myimage = L.icon({
        iconUrl: require("@/assets/dot.png"), //图片url
        iconSize: [20, 20], //设置图片大小 宽度50.高度100
        // 　　iconAnchor: [39.54, 116.23],     //设置定位点的位置。默认为中心  例子中以左上角为定位参考。相当于relative
        popupAnchor: [0, -10], //设置警示框位置 ，以iconAnchor的值进行定位。相当于absolute 例子中的警示框定位到有、右上角。
      });
      // 图标

      // 圆形
      // var circle = L.circle([38.89945, 116.40969], {
      //   color: "red",
      //   fillColor: "#f03",
      //   fillOpacity: 0.5,
      //   radius: 5000,
      // }).addTo(this.map);

      // let contentPop = `<div>设备名称:对讲机</div><div>使用者姓名:张三</div><div>电话号码:18727607984</div>`;
      // marker.bindPopup(contentPop).openPopup();
      L.control.layers(baseLayers).addTo(this.map);
      // // zoom the map to the polyline
      //  点击添加点
      _this.map.on("click", function (e) {
        if (_this.DotData) {
          _this.DotData.aplat = e.latlng.lat;
          _this.DotData.aplng = e.latlng.lng;
          _this.DotShow = true;
          _this.dialogVisible = true;
          _this.dialogTitle = "添加AP";
          _this.singleDot = null;
          _this.latlng = e.latlng;
          _this.start = null;
        }
      });
    },
    // 清除点线
    eliminate() {
      if (this.gPath) {
        this.gPath.remove(this.map);
      }
      if (this.latlngs) {
        this.latlngs.clearLayers();
      }
    },
    // 循环
    froData(condition, update) {
      let _this = this;
      _this.gPath = this.antPathShow(_this.locationData);
      _this.gPath.addTo(_this.map);
      _this.locationData.forEach((item, index) => {
        if (condition) {
          this.gatherData.push(item[2]);
        }
        var marker = _this.dot(item, item[2], update);
        // let contentPop = `<div>设备名称:对讲机</div><div>使用者姓名:张三</div><div>电话号码:18727601000</div><div class='lock-div'></div>`;
        // marker.bindPopup(contentPop).openPopup();
        if (update) {
          marker.on("dragend", function (e) {
            item[0] = marker.getLatLng().lat;
            item[1] = marker.getLatLng().lng;
            item[2].aplat = marker.getLatLng().lat;
            item[2].aplng = marker.getLatLng().lng;
            _this.gPath.remove(_this.map);
            _this.gPath = _this.antPathShow(_this.locationData);
            _this.gPath.addTo(_this.map);
          });
          marker.on("click", function (e) {
            if (_this.locationData[index + 1]) {
              _this.start = _this.locationData[index + 1];
              _this.start[2].index = index + 1;
            } else {
              _this.start = null;
            }
            _this.DotShow = true;
            _this.dialogVisible = true;
            _this.singleDot = item[2];
            _this.singleDot.index = index;
            _this.dialogTitle = "修改AP";
            _this.DotData.aplat = e.latlng.lat;
            _this.DotData.aplng = e.latlng.lng;
          });
        }
      });
    },
    // 相应地图返回内容
    mapText() {
      let text = "";
      if (this.MapText.includes("高德")) {
        text = "gcj02";
      } else if (this.MapText.includes("天地图")) {
        text = "wgs84";
      } else if (this.MapText.includes("谷歌")) {
        text = "gcj02";
      } else {
        text = "bd09";
      }
      return text;
    },
    // 显示线
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
        pulseColor: "#FFFFFF", //块颜色
      });
      return Data;
    },
  },
  watch: {
    MapText(val) {
      if (this.contentDATA) {
        this.handleNodeClick(this.contentDATA);
      }
    },
  },
  components: {
    addPath,
    addWireh,
    addDot,
  },
  created() {
    this.ShowData();
  },
  mounted() {
    this.loadMap();
  },
  destroyed() {
    this.map = null;
  },
};
</script>
<style lang="scss" scoped>
.Positioning {
  position: relative;
  &-map {
    min-height: calc(100vh - 70px);
    margin-left: 310px;
  }
  &-menu {
    position: absolute;
    left: 0;
    top: 0;
    width: 310px;
    height: 100%;

    z-index: 999;
    &-head {
      text-align: center;
      line-height: 50px;
      border-bottom: 1px solid #f2f2f2;
    }
  }
  &-tree-node {
    width: 100%;
    line-height: 30px;
  }
  &-tree-button {
    float: right;
    padding-right: 10px;
    display: none;
  }
  &-button {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1500;
    display: none;
  }
  &-tree-text {
    width: 110px;
    display: inline-block;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 12px;
  }
  &-tree-node:hover {
    .Positioning-tree-button {
      display: block;
    }
  }
}
</style>
