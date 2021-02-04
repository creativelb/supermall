<template>
  <div>
    <div class="no-item" v-if="CartList.length == 0">
      没有商品去添加点吧~
    </div>
    <cart-list-item
      v-for="(item, index) in CartList"
      :key="index"
      :itemInfo="item"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  components: {
    CartListItem,
  },
  computed: {
    ...mapGetters(["CartList"]),
  },
};
</script>

<style scoped>
.no-item{
  color: #ccc;
  font-size: 14px;
  text-align: center;
  height: 200px;
  line-height: 200px;
}
</style>