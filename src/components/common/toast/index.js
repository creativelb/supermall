import Toast from '@/components/common/toast'

let obj = {};
obj.install = function (Vue) {
  let toastConstructor = Vue.extend(Toast);
  //通过组件构造器新建一个组件对象
  let toast = new toastConstructor();
  //将组件对象挂载到一个dom元素上
  toast.$mount(document.createElement('div'));
  //t.$el就是div  将组件放到body中
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;
}


export default obj;