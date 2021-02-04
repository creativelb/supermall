<template>
  <div class="cart-bottom-bar">
    <div class="content">
      <check-button
        :isChecked="allSelect"
        @click.native="handleAllSelect"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="total">合计:¥{{ totalMoney }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CheckButton from "@/components/common/checkbutton/CheckButton";
export default {
  name: "CartBottomBar",
  computed: {
    totalMoney() {
      return this.CartList.reduce((total, item) => {
        if (item.checked) {
          total = total + item.price * item.count;
        }
        return total;
      }, 0);
    },
    // 是否全选
    allSelect() {
      if (this.CartList.length == 0) return false;
      return this.CartList.every((item) => {
        return item.checked;
      });
    },
    ...mapGetters(["CartList"]),
  },
  methods: {
    handleAllSelect() {
      // 如果购物车为空 那么点击也不要进行全选
      if (this.CartList.length == 0) return false;
      let flag = !this.allSelect;
      this.$store.dispatch("isAllSelect", flag);
    },
  },
  components: {
    CheckButton,
  },
};
</script>

<style scoped>
.cart-bottom-bar {
  height: 40px;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  font-size: 14px;
  background-color: #f5f5f5;
}
.content {
  margin-left: 10px;
  display: flex;
  height: 100%;
  align-items: center;
}
.content span {
  margin-left: 5px;
}
.total {
  margin-left: 150px;
}
</style>