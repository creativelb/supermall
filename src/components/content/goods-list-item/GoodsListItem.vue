<template>
  <div class="goods-list-item">
    <div class="img-container">
      <img :src="data.showLarge.img" />
    </div>
    <div class="text">
      <p class="title">{{ data.title }}</p>
      <p class="info">
        <span class="price">{{ data.price }}</span>
        <span class="favor">{{ data.cfav }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>
.img-container {
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
}
.img-container img {
  width: 100%;
}
.text {
  width: 100%;
  height: 40px;
  font-size: 14px;
  line-height: 20px;
}
.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.info{
  text-align: center;
}
.price{
  margin-right: 30px;
  color: #f042b0;
}
.favor{
  position: relative;
}
.favor::before{
  content: "";
  position: absolute;
  left: -15px;
  top: 1px;
  width: 15px;
  height: 15px;
  background: url("~@/assets/img/home/shoucang.svg") no-repeat ;
  background-size: contain;
}
</style>