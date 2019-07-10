import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Species from "./views/Species.vue";
import Login from "./views/Login.vue";
import Location from "./views/Location.vue";
import Profile from "./views/Profile.vue";



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/Home",
      name: "home",
      component: Home
    },
    {
      path: "/Species",
      name: "Species",
      component: Species
    },
    {
      path: "/Login",
      name: "Login",
      component: Login
    },
    {
      path: "/Location",
      name: "Location",
      component: Location
    },
    {
      path: "/Profile",
      name: "Profile",
      component: Profile
    },

  ],
  mode: 'history' // quitar # en la url
});
