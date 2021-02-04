<template>
  <div class="cart">
    <cart-nav-bar :count="CartList.length"></cart-nav-bar>
    <scroll class="scroll" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CartBottomBar from "@/views/cart/cart-components/CartBottomBar";
import CartNavBar from "@/views/cart/cart-components/CartNavBar";
import CartList from "@/views/cart/cart-components/CartList";
import Scroll from "@/components/common/scroll/Scroll.vue";
export default {
  name: "Cart",
  data() {
    return {
      sHeight: 0,
    };
  },
  watch:{
    CartList(value){
      this.$refs.scroll.refresh();
    }
  },
  mounted() {
    this.sHeight = window.innerHeight - 44 - 49 - 40;
  },
  computed: {
    // cartList(){ //vuex中的购物车
    //   return this.$store.getters.cartList;
    // } 使用了mapgetters封装
    ...mapGetters(["CartList"]),
  },
  components: {
    CartNavBar,
    CartList,
    Scroll,
    CartBottomBar,
  },
};
</script>

<style scoped>
.scroll {
  height: calc(100vh - 44px - 49px - 40px)!important;
  margin-top: 44px;
}
</style>