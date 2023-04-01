import { createRouter, createWebHashHistory } from "vue-router";

import HomePage from '../views/pages/Home'
import UserAuth from '../views/auth/Auth'
import AboutPage from '../views/pages/About'

<router-view/>

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/Auth",
    name: "UserAuth",
    component: UserAuth,
  },
  {
    path: "/About",
    name: "AboutPage",
    component: AboutPage,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router