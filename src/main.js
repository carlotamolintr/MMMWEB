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
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyDxG2pAxRlGGEjZWc0yuVOiRHATwbFw5U0",
      authDomain: "miweb-chatmmm.firebaseapp.com",
      databaseURL: "https://miweb-chatmmm.firebaseio.com",
      projectId: "miweb-chatmmm",
      storageBucket: "",
      messagingSenderId: "1059740350310",
      appId: "1:1059740350310:web:f344cbe602ce4ecd"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // firebase.initializeApp(firebaseConfig);
    // this.$store.dispatch("createUI");
    this.$store.dispatch("getJson");


    // para mantenerse logeado
    firebase.auth().onAuthStateChanged(user => { //hacemos esto para que al recargar no se desconecte el user
      if (user) {
        console.log("Hay usuario");
        this.$store.commit("setUsers", firebase.auth().currentUser);
      } else {
        console.log("No user")
        this.$store.commit("setUsers", null);

      }
    })

  },
}).$mount('#app')
