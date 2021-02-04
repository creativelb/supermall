<template>
  <navbar bgColor="#f5f5f5">
    <template v-slot:left>
      <span class="nav-left" @click="backClick">&#60;</span>
    </template>
    <template v-slot:center>
      <ul class="nav-center">
        <li
          v-for="(item, index) in list"
          :key="index"
          :class="{ active: currentIndex == index }"
          @click="itemClick(index)"
        >
          {{ item }}
        </li>
      </ul>
    </template>
  </navbar>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
export default {
  name: "DetailNavBar",
  props: {
    currentIndex:{
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      list: ["商品", "参数", "评论", "推荐"],
    };
  },
  methods:{
    backClick(){
      this.$emit('backClick');
    },
    itemClick(index){
      this.$emit('itemClick',index);
    }
  },
  components: {
    Navbar,
  },
};
</script>

<style scoped>
.nav-left {
  font-size: 28px;
}
.nav-center {
  display: flex;
  width: 80%;
  max-width: 250px;
  margin: 0 auto;
  font-size: 16px;
}
.nav-center li {
  flex: 1;
}
.active {
  color: #f042b0;
}
</style>