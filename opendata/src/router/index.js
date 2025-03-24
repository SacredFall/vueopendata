import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../views/homeView.vue'
import aboutView from '../views/aboutView.vue'
import kingVon from '../views/kingVon.vue'
import graphView from '../views/graphView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeView,
    },
    {
      path: '/about',
      name: 'about',
      component: aboutView,
    },
    {
      path: '/null',
      name: 'kingVon',
      component: kingVon,
    },
    {
      path: '/graph',
      name: 'graph',
      component: kingVon,
    },
    {
      path: '/graphs',
      name: 'graphs',
      component: graphView,
    }
  ],
})

export default router