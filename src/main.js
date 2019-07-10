import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from "firebase";
// import * as firebaseui from "firebaseui";

Vue.config.productionTip = false

var ui;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyAZDcyMS7rBf2G8jHc3FbKiP-74W1YyrIc",
      authDomain: "chattest11111.firebaseapp.com",
      databaseURL: "https://chattest11111.firebaseio.com",
      projectId: "chattest11111",
      storageBucket: "",
      messagingSenderId: "195596309105",
      appId: "1:195596309105:web:25fb527448228b16"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // firebase.initializeApp(firebaseConfig);
    // this.$store.dispatch("createUI");
    this.$store.dispatch("getJson");



  },
}).$mount('#app')
