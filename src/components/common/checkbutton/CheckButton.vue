<template>
  <div class="check-button" :class="{ active: isChecked }">
    <img src="~@/assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
};
</script>

<style scoped>
.check-button {
  overflow: hidden;
  border: 2px solid #aaa;
  border-radius: 50%;
  text-align: center;
}
.check-button img {
  display: block;
}
.active {
  background-color: red;
  border-radius: 50%;
  border: 2px solid red;
}
</style>