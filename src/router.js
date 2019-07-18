import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Species from "./views/Species.vue";
import Login from "./views/Login.vue";
import Location from "./views/Location.vue";
import Profile from "./views/Profile.vue";
import Chat from "./views/Chat.vue";
import Map from "./views/Map.vue";



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
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

    {
      path: "/Chat",
      name: "Chat",
      component: Chat
    },
    {
      path: "/Map",
      name: "Map",
      component: Map
    },

  ],
  mode: 'history' // quitar # en la url
});
