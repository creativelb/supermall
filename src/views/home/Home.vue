<template>
  <div class="home">
    <navbar bgColor="#f042b0" height="44">
      <template v-slot:center>
        <span class="nav-center">首页</span>
      </template>
    </navbar>
    <tab-control
      :data="tabControlName"
      :currentIndex="tabControlIndex"
      topDistance="44"
      @tabItemClick="tabItemClick"
      class="tab-control-sticky"
      v-show="isTabControlFixed"
    ></tab-control>
    <scroll
      class="content"
      :height="sHeight"
      :probe-type="3"
      @scroll="scroll"
      :pull-up-load="true"
      @pullingUp="pullingUp"
      ref="scroll"
    >
      <slide :banners="banner" @swiperImgUpload="swiperImgUpload"></slide>
      <recommend-view :recommends="recommend"></recommend-view>
      <feature-view :imageUrl="featureImageUrl"></feature-view>
      <tab-control
        :data="tabControlName"
        :currentIndex="tabControlIndex"
        topDistance="44"
        @tabItemClick="tabItemClick"
        ref="tabControl"
      ></tab-control>
      <div class="goods-list-container">
        <goods-list :list="goodsList || goods.sell.list"></goods-list>
      </div>
    </scroll>
    <back-top
      bottom="60"
      right="10"
      @backTopClick="backTop"
      :hidden="backTopHidden"
    ></back-top>
  </div>
</template>
<script>
import Navbar from "@/components/common/navbar/Navbar";
import Slide from "@/components/common/swiper/Slide";
import Scroll from "@/components/common/scroll/Scroll";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods-list/GoodsList";
import GoodsListItem from "@/components/content/goods-list-item/GoodsListItem";
import BackTop from "@/components/content/back-top/BackTop";

import RecommendView from "@/views/home/home-components/RecommendView";
import FeatureView from "@/views/home/home-components/FeatureView";

import { debounce } from "@/common/utils.js";
import { goodsListItemUploadMixin, backTopMixin } from "@/common/mixin.js";
import TabControlItem from "@/common/TabControlItem";
import { getHomeData, getHomeGoods } from "@/network/home.js";

export default {
  name: "Home",
  mixins: [goodsListItemUploadMixin, backTopMixin],
  data() {
    return {
      banner: [],
      recommend: [],
      featureImageUrl: require("@/assets/img/home/recommend_bg.jpg"),
      tabControlData: [
        { name: "热销", value: "sell" },
        { name: "流行", value: "pop" },
        { name: "上新", value: "new" },
      ],
      goodsList: null,
      tabControlIndex: 0,
      goods: {
        sell: new TabControlItem(1, []),
        pop: new TabControlItem(1, []),
        new: new TabControlItem(1, []),
      },
      sHeight: 0,
      // backTopHidden: true, 抽取到mixin
      topOffset: 0, //tab-contrl 粘性布局滚动距离
      isTabControlFixed: false, //是否吸顶
      scrollY: 0, // 离开时的滚动距离
      // goodsListItemUploadHandler: null, //图片加载完成的回调事件  (抽取到mixin中)
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
    _getHomeGoods(type, page) {
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);
        console.log(this.goods);
        // 处理完成调用finishPullUp
        this.$refs.scroll.finishPullUp();
      });
    },
    tabItemClick(index) {
      if (this.tabControlIndex == index) return;
      this.tabControlIndex = index;
      let list = [];
      if (index == 0) list = this.goods.sell.list;
      if (index == 1) list = this.goods.pop.list;
      if (index == 2) list = this.goods.new.list;
      this.goodsList = list;
    },
    // 回到顶部被点击  (抽取到mixin)
    // backTop() {
    //   this.$refs.scroll.scrollTo(0, 0);
    // },
    // scroll滚动时
    scroll(position) {
      if (Math.abs(position.y) > 1000) {
        this.backTopHidden = false;
      } else {
        this.backTopHidden = true;
      }
      // 设置吸顶效果
      this.isTabControlFixed =
        Math.abs(position.y) > this.topOffset ? true : false;
    },
    // 上拉加载
    pullingUp() {
      console.log("daidile");
      // 请求数据
      let type =
        this.tabControlIndex == 0
          ? "sell"
          : this.tabControlIndex == 1
          ? "pop"
          : "new";
      this.goods[type].page = this.goods[type].page + 1;
      let page = this.goods[type].page;
      this._getHomeGoods(type, page);
      // dom发生改变要refresh
      // this.$refs.scroll.refresh();
    },
    // 轮播图图片加载完成
    swiperImgUpload() {
      // 计算tab-control距离顶部距离 设置成粘性布局效果
      console.log(this.$refs.tabControl.$el.offsetTop);
      this.topOffset = this.$refs.tabControl.$el.offsetTop + 44;
    },
  },
  created() {
    this._getHomeData();
    this._getHomeGoods("sell", 1);
    this._getHomeGoods("pop", 1);
    this._getHomeGoods("new", 1);
  },
  mounted() {
    this.sHeight = window.innerHeight - 44 - 49;
    /* 下面注释内容  监听事件总线 图片加载就refresh的内容 全部抽取到mixin中*/
    // 防抖
    // let refresh = debounce(this.$refs.scroll.refresh, 500);
    // // 事件总线
    // this.goodsListItemUploadHandler = () => {
    //   // this.$refs.scroll.refresh();
    //   refresh();
    // };
    // this.$bus.$on("goodsListItemUpload", this.goodsListItemUploadHandler);
  },
  // 切换路由再回来还在原来地滚动位置
  activated() {
    this.$refs.scroll.scrollTo(0, this.scrollY, 0);
    this.$refs.scroll.refresh();

    // home激活时继续监听图片加载完成
    this.$bus.$on("goodsListItemUpload", this.goodsListItemUploadHandler);
  },
  deactivated() {
    this.scrollY = this.$refs.scroll.getScrollY();
    // 离开时不再监听
    this.$bus.$off("goodsListItemUpload", this.goodsListItemUploadHandler);
  },
  computed: {
    tabControlName() {
      let names = this.tabControlData.map((item) => {
        console.log(item);
        return item.name;
      });
      return names;
    },
  },
  components: {
    Navbar,
    Slide,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsListItem,
    GoodsList,
    Scroll,
    // BackTop, mixin
  },
};
</script>

<style scoped>
.home {
  height: 100vh;
  overflow: hidden;
}
.nav-center {
  color: #fff;
  font-size: 16px;
}
.goods-list-container {
  margin-top: 20px;
}
.content {
  overflow: hidden;
  margin-top: 44px;
}
.tab-control-sticky {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 9;
}
</style>
