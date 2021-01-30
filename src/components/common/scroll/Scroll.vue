<template>
  <div class="wrapper" ref="wrapper" :style="{ height: height + 'px' }">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    height: {
      type: Number,
      require: true,
    },
    probeType: {
      //是否监听滚动 true:监听 false:不监听
      type: Number,
      default: 0,
    },
    pullUpLoad:{
      // 是否开启上拉加载
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });
      // 如果监听滚动的话 滚动时应该派发事件
      this.scroll.on("scroll", (positon) => {
        this.$emit("scroll", positon);
      });
      this.scroll.on("pullingUp",()=>{
        this.$emit("pullingUp");
      })
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp();
    },
    refresh(){
      this.scroll && this.scroll.refresh();
    },
    getScrollY(){
      return this.scroll.y ? this.scroll.y : 0;
    }
  },
};
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}
</style>