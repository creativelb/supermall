import VueRouter from 'vue-router'
import Vue from 'vue'

const Home = ()=> import('@/views/home/Home.vue')
const Category = ()=> import('@/views/category/Category.vue')
const Cart = ()=> import('@/views/cart/Cart.vue')
const Profile = ()=> import('@/views/profile/Profile.vue')


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/category'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;