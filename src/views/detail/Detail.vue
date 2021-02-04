<template>
  <div class="detail">
    <detail-nav-bar
      :currentIndex="currentIndex"
      @backClick="backClick"
      @itemClick="navbarItemClick"
    ></detail-nav-bar>
    <scroll
      class="scroll"
      :height="sHeight"
      :probe-type="3"
      @scroll="scroll"
      ref="scroll"
    >
      <slide :banners="topImages" height="300" class="slide"></slide>
      <detail-base-info :goods="goods" ref="goods"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imgLoad="imgUpload"
      ></detail-goods-info>
      <detail-param-info ref="paramInfo" :paramInfo="detailParameter" />
      <detail-comment-info
        ref="commentInfo"
        :comments="comments"
      ></detail-comment-info>
      <goods-list ref="goodList" :list="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top
      bottom="60"
      right="10"
      @backTopClick="backTop"
      :hidden="backTopHidden"
    ></back-top>
    <toast-com :isShow="toastShow" message="已经添加到购物车" @hiddenToast="hiddenToast"></toast-com>
  </div>
</template>

<script>
import ToastCom from "@/components/common/toast/ToastCom";
import Slide from "@/components/common/swiper/Slide";
import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods-list/GoodsList";

import DetailNavBar from "@/views/detail/detail-components/DetailNavBar";
import DetailShopInfo from "@/views/detail/detail-components/DetailShopInfo";
import DetailBaseInfo from "@/views/detail/detail-components/DetailBaseInfo";
import DetailGoodsInfo from "@/views/detail/detail-components/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/detail-components/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/detail-components/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/detail-components/DetailBottomBar";

import { goodsListItemUploadMixin, backTopMixin } from "@/common/mixin.js";
import { debounce } from "@/common/utils.js";
import {
  getDetail,
  getRecommend,
  ShopInfo,
  Goods,
  ParaMeter,
  Comment,
  RecommendItem,
} from "@/network/detail.js";
export default {
  name: "Detail",
  mixins: [goodsListItemUploadMixin, backTopMixin],
  data() {
    return {
      iid: "",
      currentIndex: 0,
      sHeight: 0, //scroll的高
      topImages: [], //轮播图
      shopInfo: {}, //商家信息
      goods: {}, //商品信息
      detailInfo: {}, //商品详情
      detailParameter: {}, //参数信息
      comments: [], //评论信息
      recommends: [], //推荐数据
      // goodsListItemUploadHandler: null, //图片加载完成的回调事件  (抽取到mixin中)
      scrollY: [], //detail中各个子组件的y坐标 用于判断滚动到哪个组件
      scrollYHandler: null, //获取组件y坐标的防抖函数
      toastShow: false, //模态框是否显示
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    // 请求数据
    this._getDetail();
    this._getRecommend();
  },
  mounted() {
    this.sHeight = window.innerHeight - 44 - 49;
    /* 下面的注释内容全部放入mixin中了 */
    // 监听图片加载完成 就refresh
    // // 防抖
    // let refresh = debounce(this.$refs.scroll.refresh, 500);
    // // 事件总线
    // this.goodsListItemUploadHandler = () => {
    //   // this.$refs.scroll.refresh();
    //   refresh();
    // };
    // this.$bus.$on("goodsListItemUpload", this.goodsListItemUploadHandler);
    // 获取scrollY的防抖函数
    this.scrollYHandler = debounce(() => {
      // 获取scrollY
      this.scrollY = [];
      this.scrollY.push(0);
      this.scrollY.push(this.$refs.paramInfo.$el.offsetTop);
      this.scrollY.push(this.$refs.commentInfo.$el.offsetTop);
      this.scrollY.push(this.$refs.goodList.$el.offsetTop);
      console.log(this.scrollY);
    }, 100);
  },
  destroyed() {
    // home激活时继续监听图片加载完成
    this.$bus.$on("goodsListItemUpload", this.goodsListItemUploadHandler);
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
        // 评论信息
        let commentsList = res.data.result.rate.list;
        this.comments =
          commentsList.length == 0
            ? []
            : commentsList.map((comment) => {
                return new Comment(comment);
              });
      });
    },
    // 推荐数据
    _getRecommend() {
      getRecommend(this.iid).then((res) => {
        console.log(res);
        this.recommends = res.data.data.list.map((recommend) => {
          return new RecommendItem(recommend);
        });
      });
    },
    // 点击后退按钮
    backClick() {
      this.$router.go(-1);
    },
    // 点击导航栏的item
    navbarItemClick(index) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.$refs.scroll.scrollTo(0, 0);
          break;
        case 1:
          this.$refs.scroll.scrollToElement(this.$refs.paramInfo.$el, 500);
          break;
        case 2:
          this.$refs.scroll.scrollToElement(this.$refs.commentInfo.$el, 500);
          break;
        case 3:
          this.$refs.scroll.scrollToElement(this.$refs.goodList.$el, 500);
          break;
      }
    },
    // 图片加载完成
    imgUpload() {
      // this.$refs.scroll.refresh();
      // 防抖刷新 mixin混入了防抖刷新
      this.newRefresh();
      // 防抖获取组件坐标
      this.scrollYHandler();
    },
    // 监听滚动
    scroll(position) {
      this.currentIndex = this.getCurrentIndex(Math.abs(position.y));
      // backtop显示与隐藏
      if (Math.abs(position.y) > 1000) {
        this.backTopHidden = false;
      } else {
        this.backTopHidden = true;
      }
    },
    // 获取位置
    getCurrentIndex(y) {
      let cindex = 0;
      this.scrollY.forEach((item, index) => {
        if (y >= item) {
          cindex = index;
        }
      });
      return cindex;
    },
    // 添加到购物车
    addToCart() {
      let product = {};
      product.iid = this.iid;
      product.desc = this.goods.desc;
      product.img = this.topImages[0].image;
      product.price = this.goods.realPrice;
      console.log(product);
      // this.$store.commit('addCart',product);
      this.$store.dispatch('addCart',product).then(()=>{
        // this.$toast.show('123',2000);
        this.toastShow = true;
      });
      // alert('已经添加到购物车')
    },
    // 隐藏toast
    hiddenToast(){
      this.toastShow = false;
    }
  },
  components: {
    DetailNavBar,
    Slide,
    DetailShopInfo,
    DetailBaseInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    ToastCom
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