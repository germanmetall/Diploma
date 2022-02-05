import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from '../views/Auth.vue'
import Home from '../views/Home.vue'
import Course from '../views/Course.vue'
import Courses from '../views/Courses.vue'
import Profile from '../views/Profile.vue'
import Tasks from '../views/Tasks.vue'

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
    path: '/course/:id',
    name: 'Course',
    component: Course,
    meta: {
      title: "Курс"
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: "Профиль"
    }
  },
  {
    path: '/course/:courseId/tasks/:id',
    name: 'Tasks',
    component: Tasks,
    meta: {
      title: "Задание"
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
