import Vue from 'vue'
import Router from 'vue-router'
import Constant from '../utils/limit'
import Layout from '@/components/layout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/ringsurvey/',
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/',
          redirect: 'index'
        }, {
          path: 'index',
          name: 'index',
          component: () => import(/* webpackChunkName: Index */ '@/components/index')
        }, {
          path: 'cawi/:code',
          component: () => import(/* webpackChunkName: Questionnaire */ '@/components/questionnaire/answer')
        }
      ]
    }, {
      path: '/unauthorized',
      name: 'Error',
      component: () => import( /* webpackChunkName: Error */ '@/components/401')
    }, {
      path: '/stop',
      name: 'Error',
      component: () => import( /* webpackChunkName: Error */ '@/components/500')
    }
  ]
})
