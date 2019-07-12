<template>
  <v-container>
    <v-layout></v-layout>

    <h1>login</h1>
    <v-btn @click="login()">LOGIN</v-btn>
  </v-container>
</template>

<script>
import firebase from "firebase";
import firebaseui from "firebaseui";
let ui;
export default {
  data: function() {
    return {};
  },
  methods: {
    login: function() {
      var provider = new firebase.auth.GoogleAuthProvider(); // añadido desde documentación de firebase
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(user => {
          if (user) {
            this.$store.commit("setUsers", user);
          }
        }); // añadido desde doc. de firebase. con esto sale un pop-up para que te autentifiques
      console.log("login");
    }
  }
  // mounted() {
  // Initialize the FirebaseUI Widget using Firebase.
  // The start method will wait until the DOM is loaded.
  // this.$store.state.ui.start("#firebaseui-auth-container", {
  //   signInSuccessUrl: "<url-to-redirect-to-on-success>", // url a la que te diriges después de logearte
  //   signInOptions: [
  //     // Leave the lines as is for the providers you want to offer your users.
  //     firebase.auth.GoogleAuthProvider.PROVIDER_ID
  //   ],
  //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
  //   firebase.auth.EmailAuthProvider.PROVIDER_ID,
  //   firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  //   firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID

  // getData() {
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       name = firebase.auth().currentUser.displayName; // User is signed in.
  //     } else {
  //       // No user is signed in.
  //     }
  //   });
  // }
};
</script>



<style>
.firebaseui-id-page-callback {
  background: url("~@/assets/loading.gif");
  background-size: cover;
  height: 400px;
  width: 400px;
  background-size: 200px;
  background-repeat: no-repeat;
  background-position-x: center !important;
}
.firebaseui-busy-indicator {
  display: none;
}
</style>
