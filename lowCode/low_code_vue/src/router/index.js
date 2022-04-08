import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/page/MainPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mianPage',
      component: MainPage
    }
  ]
})
