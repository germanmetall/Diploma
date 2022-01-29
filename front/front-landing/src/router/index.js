import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Courses from '../views/Courses.vue'
import Course from '../views/Course.vue'
import FAQ from '../views/FAQ.vue'
import Contacts from '../views/Contacts.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Главная'
    }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses,
    meta: {
      title: 'Курсы'
    }
  },
  {
    path: '/course/:id',
    name: 'Course',
    component: Course,
    meta: {
      title: 'Курсы'
    }
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ,
    meta: {
      title: 'Вопросы'
    }
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts,
    meta: {
      title: 'Контакты'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const DEFAULT_TITLE = 'Курсы';
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || DEFAULT_TITLE;
  next();
})

export default router
