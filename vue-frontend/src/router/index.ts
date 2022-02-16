import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../views/Login.vue";
import ProtectedPage from "../views/ProtectedPage.vue";
import Register from "../views/Register.vue";
import axios from "axios";
import Cookies, { COOKIE } from "@/utils/cookie";
import { ToastProgrammatic } from "buefy";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta:{
      requireAuth: false
    }
  },
  {
    path: "/protected-page",
    name: "ProtectedPage",
    component: ProtectedPage,
    meta:{
      requireAuth: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta:{
      requireAuth: false
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {

  // If reached protected route:
  // 1. Get token (JWT) from cookie (token value depends if cookie either exists or not)
  // 2. Set authorization header with Bearer token (JWT)
  // 3. Call auth/profile endpoint to extract the token from the Bearer token and check if token (JWT) is valid
  // 4. If successful response (200) and have data, then proceed to protected route
  // 5. Otherwise, catch the error from server and return back to login page

  if (to && to.meta && to.meta.requireAuth === true) {
    
    const access_token: string | undefined  = Cookies.get(COOKIE.TOKEN)? Cookies.get(COOKIE.TOKEN): "";

    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    try { 
      await axios.get("http://localhost:3000/auth/profile")
      .then(response => {
        if (response.status === 200 && response.data) {
          next();
        }
      });
    } catch (error) {
      ToastProgrammatic.open({
        message: 'Please Login to Access',
        type: 'is-danger',
        duration: 3000,
      });
      next({
        path: '/login',
      });
    }; 

  };

  next();
});

export default router;
