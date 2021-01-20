<template>
  <div class="recommend-view">
    <div class="recommend-item" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default: () => {},
    },
  },
  mounted(){
    console.log(this.recommends);
  }
};
</script>

<style>
.recommend-view{
  display: flex;
  align-items: center;
  padding-top: 20px;
  width: 100%;
  padding-bottom: 30px;
  border-bottom: 2px solid rgba(0, 0, 0, .1);
}
.recommend-item{
  flex:auto;
  padding: 0 15px;
}
.recommend-item img {
  width: 100%
}
.recommend-item div {
  font-size: 14px; 
  margin-top: 5px;
}
</style>