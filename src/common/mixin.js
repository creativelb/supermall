import { debounce } from "@/common/utils.js";
import BackTop from "@/components/content/back-top/BackTop";

export const goodsListItemUploadMixin = {
  data() {
    return {
      goodsListItemUploadHandler: null, //图片加载完成的回调事件
      newRefresh: null, //刷新防抖函数
    }
  },
  mounted() {
    // 防抖
    this.newRefresh = debounce(this.$refs.scroll.refresh, 500);
    // 事件总线
    this.goodsListItemUploadHandler = () => {
      // this.$refs.scroll.refresh();
      this.newRefresh();
    };
    this.$bus.$on("goodsListItemUpload", this.goodsListItemUploadHandler);
  }
}

export const backTopMixin = {
  data() {
    return {
      backTopHidden: true,
    }
  },
  methods: {
    // 回到顶部被点击
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
  },
  components: {
    BackTop
  }
}