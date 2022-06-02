import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from '../views/Auth.vue'
import Home from '../views/Home.vue'
import Course from '../views/Course.vue'
import Courses from '../views/Courses.vue'
import Profile from '../views/Profile.vue'
import Tasks from '../views/Tasks.vue'
import Hint from '../views/Hint.vue'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      title: "Вхід"
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Головна"
    }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses,
    meta: {
      title: "Мої курси"
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
      title: "Профіль"
    }
  },
  {
    path: '/course/:courseId/tasks/:id',
    name: 'Tasks',
    component: Tasks,
    meta: {
      title: "Завдання"
    }
  },
  {
    path: '/hint',
    name: 'Hint',
    component: Hint,
    meta: {
      title: "Довідка"
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const DEFAULT_TITLE = 'Курси';
router.beforeEach((to, from, next) => {
  if ((localStorage.getItem("jwt")==undefined || localStorage.getItem("jwt")=="") && to.name !== 'Auth') {
    next({ name: 'Auth' })
  }
  document.title = to.meta.title || DEFAULT_TITLE;
  next();
})

export default router
