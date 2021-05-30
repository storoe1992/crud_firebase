import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/Users.vue'
const User = () => import('../views/User')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/list'
  },
  {
    path: '/list',
    name: 'Users',
    component: Users
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/user/:userid',
    name: 'User',
    props:true,
    component: User
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
