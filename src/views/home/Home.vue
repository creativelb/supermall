<template>
  <div class="home">
    <navbar bgColor="#f042b0" height="44">
      <template v-slot:center>
        <span class="nav-center">首页</span>
      </template>
    </navbar>
    <slide :banners="banner"></slide>
    <recommend-view :recommends="recommend"></recommend-view>
    <feature-view :imageUrl="featureImageUrl"></feature-view>
    <tab-control
      :data="tabControlData"
      :currentIndex="tabControlIndex"
      topDistance="44"
      @tabItemClick="tabItemClick"
    ></tab-control>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>
<script>
import Navbar from "@/components/common/navbar/Navbar";
import Slide from "@/components/common/swiper/Slide";
import TabControl from "@/components/content/tabControl/TabControl";

import RecommendView from "@/views/home/home-components/RecommendView";
import FeatureView from "@/views/home/home-components/FeatureView";

import { getHomeData } from "@/network/home.js";

export default {
  name: "Home",
  data() {
    return {
      banner: [],
      recommend: [],
      featureImageUrl: require("@/assets/img/home/recommend_bg.jpg"),
      tabControlData: ["流行", "新款", "精选"],
      tabControlRoute: [], //这是tabControl对应每个选项的路由
      tabControlIndex: 0,
    };
  },
  methods: {
    _getHomeData() {
      getHomeData().then((res) => {
        console.log(res);
        this.banner = res.data.data.banner.list;
        this.recommend = res.data.data.recommend.list;
        console.log(this.recommend);
      });
    },
    tabItemClick(index) {
      if (this.tabControlIndex == index) return;
      this.tabControlIndex = index;
      // let path = this.tabControlRoute[index];
      // this.$router.replace(path);
    },
  },
  created() {
    this._getHomeData();
  },
  components: {
    Navbar,
    Slide,
    RecommendView,
    FeatureView,
    TabControl,
  },
};
</script>

<style>
.nav-center {
  color: #fff;
  font-size: 16px;
}
</style>
