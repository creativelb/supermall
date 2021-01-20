<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" class="swiper-image" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  name: "Slide",
  props: {
    banners: {
      type: Array,
      default: () => [],
    },
    loop: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: Number,
      default: 1000,
    },
  },
  mounted() {
    setTimeout(() => {
      new Swiper(".swiper-container", {
        autoplay: this.autoplay
          ? {
              delay: this.delay,
              stopOnLastSlide: false,
              disableOnInteraction: false,
            }
          : false,
        loop: this.loop,
      });
    }, 50);
  },
};
</script>

<style>
.swiper-image {
  width: 100%;
}
</style>