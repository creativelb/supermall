<template>
  <div class="goods-list">
    <goods-list-item class="item" v-for="(item,index) in list" :key="index" :data="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods-list-item/GoodsListItem"
export default {
  name: 'GoodsList',
  props:{
    list:{
      type: Array,
      default: ()=>[]
    }
  },
  components:{
    GoodsListItem
  }
}
</script>

<style scoped>
.goods-list{
  display: flex;
  flex-wrap: wrap;
}
.item{
  width: 50%;
  padding: 5px 5px 10px;
}
</style>