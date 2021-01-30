<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" class="swiper-image" @load="imgUpload" :style="{height: height + 'px'}"/>
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
    height:{
      type: String,
      default: '200'
    }
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
  methods:{
    imgUpload(){
      this.$emit('swiperImgUpload');
    }
  }
};
</script>

<style>
.swiper-image {
  width: 100%;
  object-fit: cover;
  object-position: center top;
}
</style>