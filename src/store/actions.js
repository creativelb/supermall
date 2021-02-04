const actions = {
  //添加到购物车
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      payload.checked = true;
      let index = -1;
      context.state.cartList.forEach((item, i) => {
        if (item.iid === payload.iid) {
          index = i;
        }
      })
      let count = 1;
      if (index != -1) {
        count = context.state.cartList[index].count + 1;
        // state.cartList.splice(index, 1);
        context.commit('deleteCartItem', index);
      }
      payload.count = count;
      // state.cartList.unshift(payload);
      context.commit('addToCart', payload);
      resolve();
    })
  },
  // 是否全选
  isAllSelect(context, payload) {
    console.log(context.getters.CartList, payload);
    context.getters.CartList.forEach(item => {
      context.commit('changeChecked', {
        item,
        flag: payload
      })
    });
  }
}

export default actions