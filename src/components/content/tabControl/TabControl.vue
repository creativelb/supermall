<template>
  <!-- :class="{ sticky: sticky }"
    :style="{ top: sticky ? topDistance + 'px' : 0 }" -->
  <div class="tab-control" @click.prevent>
    <div
      class="tab-item"
      v-for="(item, index) in data"
      :key="index"
      @click="tabItemClick(index)"
    >
      <span class="tab-text" :class="{ active: currentIndex == index }">{{
        item
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      scrollDistance: 0,
    };
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
    topDistance: {
      type: String,
      default: 0,
    },
    sticky: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    // let tabControl = document.querySelector(".tab-control");
    // let a = window.addEventListener("scroll", this.scroll, true);
    // this.scrollDistance = this.getTotalTop(tabControl) - this.topDistance;
    // console.log(this.scrollDistance);
  },
  methods: {
    tabItemClick(index) {
      console.log(index);
      this.$emit("tabItemClick", index);
    },
    scroll(e) {
      console.log(document.documentElement.scrollTop);
    },
    getTotalTop(elem) {
      let sum = 0;
      do {
        sum += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
      return sum;
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  align-items: center;
  height: 40px;
  text-align: center;
  font-size: 16px;
  background-color: #fff;
}
.tab-item {
  flex: 1;
}
.tab-item span {
  transition: all 0.1s linear;
  padding: 0 10px 5px;
}
.active {
  color: #f042b0;
  border-bottom: 2px solid #f042b0;
}
/* .sticky {
  position: sticky;
} */
</style>