<template>
  <div class="detail">
    <detail-nav-bar
      @backClick="backClick"
      @itemClick="navbarItemClick"
    ></detail-nav-bar>
    <scroll class="scroll" :height="sHeight" :probe-type="3" ref="scroll">
      <slide :banners="topImages" height="300" class="slide"></slide>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imgLoad="imgUpload"
      ></detail-goods-info>
      <detail-param-info ref="paramInfo" :paramInfo="detailParameter" />
    </scroll>
  </div>
</template>

<script>
import Slide from "@/components/common/swiper/Slide";
import Scroll from "@/components/common/scroll/Scroll";

import DetailNavBar from "@/views/detail/detail-components/DetailNavBar";
import DetailShopInfo from "@/views/detail/detail-components/DetailShopInfo";
import DetailBaseInfo from "@/views/detail/detail-components/DetailBaseInfo";
import DetailGoodsInfo from "@/views/detail/detail-components/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/detail-components/DetailParamInfo";

import { getDetail, ShopInfo, Goods, ParaMeter } from "@/network/detail.js";
export default {
  name: "Detail",
  data() {
    return {
      iid: "",
      sHeight: 0, //轮播图的高
      topImages: [], //轮播图
      shopInfo: {}, //商家信息
      goods: {}, //商品信息
      detailInfo: {}, //商品详情
      detailParameter: {}, //参数信息
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    // 请求数据
    this._getDetail();
  },
  mounted() {
    this.sHeight = window.innerHeight - 44;
  },
  methods: {
    // 请求详情数据
    _getDetail() {
      getDetail(this.iid).then((res) => {
        console.log(res);
        // banner
        this.topImages = res.data.result.itemInfo.topImages.map((item) => {
          return {
            image: item,
            link: "",
          };
        });
        // 商品信息
        this.goods = new Goods(
          res.data.result.itemInfo,
          res.data.result.columns,
          res.data.result.shopInfo.services
        );
        // 商铺信息
        let _shopinfo = res.data.result.shopInfo;
        this.shopInfo = new ShopInfo(
          _shopinfo.shopId,
          _shopinfo.cFans,
          _shopinfo.cGoods,
          _shopinfo.cSells,
          _shopinfo.score,
          _shopinfo.shopLogo,
          _shopinfo.name
        );
        //保存商品详情信息
        this.detailInfo = res.data.result.detailInfo;
        console.log(this.shopInfo);
        // 保存参数信息
        this.detailParameter = new ParaMeter(
          res.data.result.itemParams.info,
          res.data.result.itemParams.rule
        );
      });
    },
    // 点击后退按钮
    backClick() {
      console.log("back");
    },
    // 点击导航栏的item
    navbarItemClick(index) {
      console.log(index);
    },
    // 图片加载完成
    imgUpload() {
      this.$refs.scroll.refresh();
    },
  },
  components: {
    DetailNavBar,
    Slide,
    DetailShopInfo,
    DetailBaseInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.scroll {
  margin-top: 44px;
}
/* .slide {
  margin-top: 44px;
} */
</style>