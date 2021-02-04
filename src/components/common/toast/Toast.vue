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
  data() {
    return {
      isShow: fasle,
      message: "",
    };
  },
  methods: {
    hiddenToast() {
      this.isShow = fasle;
    },
    show(message = "默认文字", duration = 2000) {
      this.isShow = ture;
      this.message = message;
      setTimeout(() => {
        this.isShow = fasle;
      }, duration);
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
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 16px;
}
</style>