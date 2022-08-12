import { createRouter, createWebHashHistory } from 'vue-router'

// landing
import landingHome from '../views/landingHome.vue'
import landingCourses from '../views/landingCourses.vue'
import landingCourse from '../views/landingCourse.vue'
import FAQ from '../views/FAQ.vue'
import Contacts from '../views/Contacts.vue'

// platform
import Auth from '../views/Auth.vue'
import Home from '../views/Home.vue'
import Course from '../views/Course.vue'
import Courses from '../views/Courses.vue'
import Profile from '../views/Profile.vue'
import Tasks from '../views/Tasks.vue'
import Hint from '../views/Hint.vue'

const routes = [
  // platform
  {
    path: "/platform",
    name: 'Home',
    component: Home,
    meta: {
      title: "Головна"
    }
  },
  {
    path: '/platform/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      title: "Вхід"
    }
  },
  {
    path: '/platform/courses',
    name: 'Courses',
    component: Courses,
    meta: {
      title: "Мої курси"
    }
  },
  {
    path: '/platform/course/:id',
    name: 'Course',
    component: Course,
    meta: {
      title: "Курс"
    }
  },
  {
    path: '/platform/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: "Профіль"
    }
  },
  {
    path: '/platform/course/:courseId/tasks/:id',
    name: 'Tasks',
    component: Tasks,
    meta: {
      title: "Завдання"
    }
  },
  {
    path: '/platform/hint',
    name: 'Hint',
    component: Hint,
    meta: {
      title: "Довідка"
    }
  },
  // landing
  {
    path: "/",
    name: 'landingHome',
    component: landingHome,
    meta: {
      title: 'Головна'
    }
  },
  {
    path: '/courses',
    name: 'landingCourses',
    component: landingCourses,
    meta: {
      title: 'Курси'
    }
  },
  {
    path: '/course/:id',
    name: 'landingCourse',
    component: landingCourse,
    meta: {
      title: 'Курси'
    }
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ,
    meta: {
      title: 'Питання'
    }
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts,
    meta: {
      title: 'Контакти'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const DEFAULT_TITLE = 'Курси';
router.beforeEach((to, from, next) => {
  console.log(to.fullPath.startsWith("/platform"), localStorage.getItem("jwt"));
  if (to.fullPath.startsWith("/platform") && (localStorage.getItem("jwt")==undefined || localStorage.getItem("jwt")=="") && to.name !== 'Auth') {
    next({ name: 'Auth' })
  }
  document.title = to.meta.title || DEFAULT_TITLE;
  next();
})

export default router
