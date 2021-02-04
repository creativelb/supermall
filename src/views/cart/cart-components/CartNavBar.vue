<template>
  <navbar bgColor="#f042b0">
    <template v-slot:center>
      <span class="nav-cart">购物车({{count}})</span>
    </template>
  </navbar>
</template>

<script>
import Navbar from '@/components/common/navbar/Navbar'
export default {
  name: 'CartNavBar',
  props:{
    count: {
      type: Number,
      default: 0
    }
  },
  components:{
    Navbar
  }
}
</script>

<style scoped>
.nav-cart{
  color: #fff;
  font-size: 16px;
}
</style>