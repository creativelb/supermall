<template>
  <div class="back-top" :style="backTopStyle" @click="backTopClick">
    <img :src="imgUrl" alt="回到顶部" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  props: {
    hidden: {
      type: Boolean,
      default: true,
    },
    zIndex:{
      type: String,
      default: "9"
    },
    top: {
      type: String,
      default: "0",
    },
    bottom: {
      type: String,
      default: "0",
    },
    left: {
      type: String,
      default: "0",
    },
    right: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      imgUrl: require("@/assets/img/back-top/top-arrow.svg"),
    };
  },
  computed:{
    backTopStyle(){
      let x,xValue;
      if((this.top == 0 && this.bottom ==0) || this.top != 0 ) {
        x = 'top';
        xValue = this.top;
      }else{
        x = 'bottom';
        xValue = this.bottom;
      }
      let y,yValue;
      if((this.left == 0 && this.right ==0) || this.left != 0 ) {
        y = 'left';
        yValue = this.left;
      }else{
        y = 'right';
        yValue = this.right;
      }
      return {
        zIndex: this.zIndex,
        visibility: this.hidden ? 'hidden' : 'visible',
        [x]: xValue + 'px',
        [y]: yValue + 'px'
      }
    }
  },
  methods:{
    backTopClick(){
      this.$emit('backTopClick');
    }
  }
};
</script>

<style>
.back-top {
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f5f5f5;
  padding: 10px;
}
.back-top img {
  width: 100%;
}
</style>