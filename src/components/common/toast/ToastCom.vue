<template>
  <div class="toast" @click.prevent="hiddenToast" v-if="isShow">
    <div class="content">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    isClickHidden: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 2000,
    },
    message: {
      type: String,
      default: "默认文字",
    },
  },
  watch: {
    isShow(value) {
      if (value) {
        setTimeout(() => {
          this.$emit("hiddenToast");
        }, this.duration);
      }
    },
  },
  methods: {
    hiddenToast() {
      if (isClickHidden) {
        this.$emit("hiddenToast");
      }
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.content {
  height: 40px;
  padding: 0 15px;
  border-radius: 20px;
  font-size: 16px;
  line-height: 40px;
  color: #fff;
  background-color: rgba(0, 0, 0, .7);
}
</style>