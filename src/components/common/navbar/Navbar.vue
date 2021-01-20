<template>
  <div class="navbar" :style="{ backgroundColor: bgColor,height: `${height}px`,zIndex:zindex }">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    bgColor: {
      type: String,
      defalut: "#f042b0",
    },
    height:{
      type: String,
      default: 44
    },
    zindex:{
      type:Number,
      default: 9
    }
  },
};
</script>

<style>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.left{
  width: 60px;
}
.center{
  flex:1;
}
.right{
  width: 60px;
}
</style>