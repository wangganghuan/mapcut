<template>
  <div class="index">
    <div class="index-head">
      <div class="index-img">
        <img src="~@/assets/logo.png" alt="" />
      </div>
      <div class="index-title">
        <ul class="index-title-ul">
          <li
            v-for="item in title"
            :key="item.id"
            :class="{ pitch: text == item.routerData }"
            @click="cut(item)"
          >
            {{ item.text }}
          </li>
        </ul>
      </div>
    </div>
    <div class="index-content">
      <router-view></router-view>
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
      text: "home",
      title: [
        { text: "首页", id: 1, routerData: "home" },
        { text: "定位设备管理", id: 2, routerData: "Table" },
        { text: "定位路线管理", id: 3, routerData: "positioning" },
        { text: "定位数据回放", id: 4, routerData: "timeData" },
      ],
    };
  },
  methods: {
    cut(item) {
      if (this.text != item.routerData) {
        this.text = item.routerData;
        this.$router.push(item.routerData);
      }
    },
    colours() {},
  },
  mounted() {
  
    this.text=this.$route.name
  },
};
</script>
<style lang="scss" scoped>
.index {
  height: 100%;
  &-content {
    padding-top: 70px;
  }
}

.index-head {
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 999;
  height: 70px;
  background: url("~@/assets/topBG.jpg");
}
.index-img {
  height: 100%;
  width: 200px;
  text-align: center;
  padding-top: 20px;
  float: left;
  background-color: #fff;
  background: url("~@/assets/topLeftBG.jpg");
}
.index-img::before {
  position: absolute;
  content: " ";
  background: url("~@/assets/topPIC.png");
  height: 70px;
  width: 40px;
  top: 0;
  left: 200px;
}
.index-title {
  padding-left: 200px;
  width: 100%;

  &-ul {
    overflow: hidden;
    line-height: 70px;
    width: 100%;
    > li {
      float: left;
      width: 20%;
      text-align: center;
      cursor: pointer;
      font-size: 16px;
    }
  }
  .pitch {
    font-weight: 700;
    color: #1286cc;
    font-size: 18px;
  }
}
</style>
