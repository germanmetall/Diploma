import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from '../views/Auth.vue'
import Home from '../views/Home.vue'
import Courses from '../views/Courses.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      title: "Вход"
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Главная"
    }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses,
    meta: {
      title: "Мои курсы"
    }
  },
  {
    path: '/courses/:id',
    name: 'Course',
    component: Courses,
    meta: {
      title: "Курс"
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: "Личный кабинет"
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
