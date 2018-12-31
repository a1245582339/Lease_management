import Vue from 'vue'
import Router from 'vue-router'
import Turnover from '@/views/Turnover.vue'
import Query from '@/views/Query'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/turnover'
    },
    {
      path: '/turnover',
      name: 'Turnover',
      component: Turnover
    },
    {
      path: '/query',
      name: 'Query',
      component: Query
    }
  ]
})
