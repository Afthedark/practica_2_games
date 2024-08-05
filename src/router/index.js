import GamesView from '@/views/games/GamesView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import CategoriesView from '@/views/categories/CategoriesView.vue'

const routes = [
  {
    path: '/',
    name: 'juegos',
    component: GamesView
  },
  {
    path: '/categorias',
    name: 'categorias',
    component: CategoriesView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
