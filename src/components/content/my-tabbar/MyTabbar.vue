<template>
  <div id="my-tabbar">
    <tabbar @click.prevent>
      <tabbar-item :active="currentIndex == 0" @tabbarItemClick="tabbarItemClick(0)">
        <template v-slot:icon-img>
          <img src="@/assets/img/tabbar/home.svg" alt="" class="icon-img" />
        </template>
        <template v-slot:icon-img-active>
          <img
            src="@/assets/img/tabbar/home-active.svg"
            alt=""
            class="icon-img"
          />
        </template>
        <template v-slot:icon-test>
          <div class="icon-text">首页</div>
        </template>
      </tabbar-item>
      <tabbar-item :active="currentIndex == 1" @tabbarItemClick="tabbarItemClick(1)">
        <template v-slot:icon-img>
          <img src="@/assets/img/tabbar/category.svg" alt="" class="icon-img" />
        </template>
        <template v-slot:icon-img-active>
          <img
            src="@/assets/img/tabbar/category-active.svg"
            alt=""
            class="icon-img"
          />
        </template>
        <template v-slot:icon-test>
          <div class="icon-text">首页</div>
        </template>
      </tabbar-item>
      <tabbar-item :active="currentIndex == 2" @tabbarItemClick="tabbarItemClick(2)">
        <template v-slot:icon-img>
          <img src="@/assets/img/tabbar/cart.svg" alt="" class="icon-img" />
        </template>
        <template v-slot:icon-img-active>
          <img
            src="@/assets/img/tabbar/cart-active.svg"
            alt=""
            class="icon-img"
          />
        </template>
        <template v-slot:icon-test>
          <div class="icon-text">首页</div>
        </template>
      </tabbar-item>
      <tabbar-item :active="currentIndex == 3" @tabbarItemClick="tabbarItemClick(3)">
        <template v-slot:icon-img>
          <img src="@/assets/img/tabbar/profile.svg" alt="" class="icon-img" />
        </template>
        <template v-slot:icon-img-active>
          <img
            src="@/assets/img/tabbar/profile-active.svg"
            alt=""
            class="icon-img"
          />
        </template>
        <template v-slot:icon-test>
          <div class="icon-text">首页</div>
        </template>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/common/tabbar/Tabbar";
import TabbarItem from "@/components/common/tabbar-item/TabbarItem";
export default {
  name: "MyTabbar",
  data(){
    return{
      currentIndex: 0
    }
  },
  methods:{
    // index是第几个tabbar-item被点击了
    tabbarItemClick(index){ 
      this.currentIndex = index;
      this.$emit('tabbarItemClick',index);
    }
  },
  components: {
    Tabbar,
    TabbarItem,
  },
};
</script>

<style>
</style>