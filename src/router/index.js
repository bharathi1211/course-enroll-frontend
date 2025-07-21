import { createRouter, createWebHistory } from "vue-router";
import CourseView from "../views/CourseView.vue";
import StaffView from "../views/StaffView.vue";
import HomePage from "../components/HomePage.vue";                          
import login from "../components/login.vue";
const routes = [
  { path : "/courses", component: CourseView , meta:{requireAuth: true} },
  {path : "/", component: login },
  { path : "/home", component: HomePage,   meta:{requireAuth: true} },
  { path : "/staff", component: StaffView ,  meta:{requireAuth: true}  },];
  const router = createRouter({
    history : createWebHistory(),routes
  })
  router.beforeEach((to,from, next) => {
    const token = sessionStorage.getItem('token');
    if(to.meta.requireAuth && !token) {
      next('/');
    }
    else {
      next();
    }});
  export default router;