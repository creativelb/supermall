<template>
  <div class="feature-view">
    <a :href="link">
      <img :src="imageUrl" />
    </a>
  </div>
</template>

<script>
export default {
  name: "FeatureView",
  props: {
    link: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>

.feature-view a{
  display: block;
}
.feature-view a,.feature-view img {
  width: 100%;
  height: 100%;
}
</style>