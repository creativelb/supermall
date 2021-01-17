<template>
  <div class="navbar" :style="{ backgroudColor: bgColor }">
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