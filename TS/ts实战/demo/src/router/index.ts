import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export enum RouterPath {
  Index = '/',
  About = '/about',
  User = '/user'
}
const routes: Array<RouteConfig> = [
  {
    path: RouterPath.Index,
    name: 'Home',
    component: Home
  },
  {
    path: RouterPath.About,
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: RouterPath.User,
    name: 'User',
    component: () => import('../views/User.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
