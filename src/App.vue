<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <my-tabbar @tabbarItemClick="tabbarItemClick"></my-tabbar>
  </div>
</template>
<script>
import MyTabbar from "@/components/content/my-tabbar/MyTabbar";
export default {
  name: "App",
  methods: {
    tabbarItemClick(index) {
      let path = "";
      if (index == 0) {
        path = "/home";
      }
      if (index == 1) {
        path = "/category";
      }
      if (index == 2) {
        path = "/cart";
      }
      if (index == 3) {
        path = "/profile";
      }
      this.$router.replace(path);
    },
  },
  components: {
    MyTabbar,
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>