import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
  },
  {
    path: '/orderlist',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "OrderList" */ '../views/orderlist/OrderList')
  },
  {
    path: '/ordercomformation/:id/:addressId?',
    name: 'OrderComforMation',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/ordercomformation/OrderComforMation')
  },
  {
    path: '/myperson',
    name: 'MyPerson',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/myown/MyPerson')
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/shoppingCart/ShopCart')
  },
  {
    path: '/sertaddress/:id?',
    name: 'sertAddress',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/setaddress/SetAddress')
  },
  {
    path: '/addresslist',
    name: 'MyAddressList',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/myaddressList/MyAddressList')
  },
  {
    path: '/chooseAddress/:id',
    name: 'ChooseAddress',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/chooseAddressList/ChooseAddressList')
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import(/* webpackChunkName: "cartList" */ '../components/Map')
  },
  {
    path:'/login',
    name:'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: 'Home'}):  next();
    }
  },
  {
    path:'/register',
    name:'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register/Register')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "home" */ '../views/shop/Shop')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from ,next) => {
  const { isLogin } = localStorage;
  const { name } = to;
  const isLoginOrRegister = (name === "Login" || name === "Register");
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login'});
})

export default router
