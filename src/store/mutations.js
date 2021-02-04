const mutations = {
  //删除购物车中的元素
  deleteCartItem(state,index){
    state.cartList.splice(index, 1);
  },
  // 往购物车前面添加元素
  addToCart(state,payload){
    state.cartList.unshift(payload);
  },
  // 抽取到了了action中
  // addCart(state, payload) {
  //   payload.checked = true;
  //   let index = -1;
  //   state.cartList.forEach((item, i) => {
  //     if (item.iid === payload.iid) {
  //       index = i;
  //     }
  //   })
  //   let count = 1;
  //   if (index != -1) {
  //     count = state.cartList[index].count + 1;
  //     state.cartList.splice(index, 1);
  //   }
  //   payload.count = count;
  //   state.cartList.unshift(payload);
  // },
  // 给购物车元素是否选择取反
  ischecked(state, payload) {
    console.log(payload);
    payload.checked = !payload.checked
  },
  // 给购物车的元素是否选择设定状态
  changeChecked(state, payload) {
    payload.item.checked = payload.flag;
  }
}
export default mutations;