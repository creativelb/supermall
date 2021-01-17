<template>
  <div id="tabbar" :style="{height:tHeight,backgroundColor:tBackgroundColor}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  data(){
    return {
      currentIndex: 0
    }
  },
  props:{
    tHeight:{
      type: String,
      default: "49px"
    },
    tList:{
      type: Array,
      default: ()=> []
    },
    tBackgroundColor:{
      type: String,
      default: '#f6f6f6'
    }
  }
}
</script>

<style>
#tabbar{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px -1px 2px 0px rgb(0, 0, 0,.1);
}
.tabbar-item{
    flex: 1;
}
.tabbar-item img{

  width: 24px;
  height: 24px;
}
</style>