import { createRouter, createWebHashHistory } from "vue-router";

import HomePage from '../views/pages/Home'
import UserAuth from '../views/auth/Auth'
import AboutPage from '../views/pages/About'
import ProfilePage from '../views/pages/Profile'
import InvoiceCreator from '../views/pages/Creator'

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
    path: "/Profile",
    name: "Profile",
    component: ProfilePage,
  },
  {
    path: "/About",
    name: "AboutPage",
    component: AboutPage,
  },
  {
    path: "/Creator",
    name: "Creator",
    component: InvoiceCreator,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router