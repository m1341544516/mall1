import Vue from 'vue'
import VueRouter from 'vue-router'
// 组件懒加载
const Home = () =>
  import ('../views/home/Home.vue')
const Category = () =>
  import ('../views/category/Category.vue')
const Cart = () =>
  import ('../views/cart/Cart.vue')
const Profile = () =>
  import ('../views/profile/Profile.vue')
const Detail = () =>
  import ('../views/detail/Detail.vue')

//   避免到当前位置的冗余导航，解决重复触发同一个路由的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [{
    path: '',
    redirect: '/home'
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
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})
export default router