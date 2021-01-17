<template>
  <div id="tabbar-item" @click="click">
    <div v-if="!active">
      <slot name="icon-img"></slot>
    </div>
    <div v-if="active">
      <slot name="icon-img-active"></slot>
    </div>
    <div :style="{ color: active ? activeColor : '#000' }">
      <slot name="icon-test"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabbarItem",
  methods: {
    click() {
      this.$emit("tabbarItemClick");
    },
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    activeColor: {
      type: String,
      default: '#f042b0'
    },
  },
};
</script>

<style>
#tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon-img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: bottom;
}
.icon-text {
  font-size: 14px;
}
.active {
  color: #f042b0;
}
</style>