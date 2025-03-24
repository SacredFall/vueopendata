import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../views/homeView.vue'
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
      path: '/null',
      name: 'kingVon',
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