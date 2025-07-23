import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Snooker from '../pages/Snooker.vue'
import Medical from '../pages/Medical.vue'
import IT from '../pages/IT.vue'
import Login from '../pages/Login.vue'
import LearningCenter from '../pages/LearningCenter.vue'
import Test from '../pages/Test.vue'
import Help from '../pages/Help.vue'
import Cryptocurrency from '../pages/Cryptocurrency.vue'
import Academic from '../pages/Academic.vue'

// 定义路由配置
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: {
      template: '<div class="text-center text-xl p-8">About Page - Coming Soon</div>',
    },
  },
  {
    path: '/snooker',
    name: 'snooker',
    component: Snooker
  },
  {
    path: '/medical',
    name: 'medical',
    component: Medical
  },
  {
    path: '/it',
    name: 'it',
    component: IT
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/learning-center',
    name: 'learning-center',
    component: LearningCenter
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/help',
    name: 'help',
    component: Help
  },
  {
    path: '/cryptocurrency',
    name: 'cryptocurrency',
    component: Cryptocurrency
  },
  {
    path: '/academic',
    name: 'academic',
    component: Academic
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
