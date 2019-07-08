<template>
  <v-container>
    <v-layout></v-layout>

    <h1>login</h1>
    <div id="firebaseui-auth-container"></div>
  </v-container>
</template>



<script>
import firebase from "firebase";
import * as firebaseui from "firebaseui";
export default {
  methods: {
    login: function() {
      var provider = new firebase.auth.GoogleAuthProvider(); // añadido desde documentación de firebase
      firebase.auth().signInWithPopup(provider); // añadido desde doc. de firebase. con esto sale un pop-up para que te autentifiques
      console.log("login");
    }
  },
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

    var uiConfig = {
      signInSuccessUrl: "<url-to-redirect-to-on-success>", // url a la que te diriges después de logearte
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
        //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
        //   firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //   firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        //   firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: "<your-tos-url>",
      // Privacy policy url/callback.
      privacyPolicyUrl: function() {
        window.location.assign("<your-privacy-policy-url>");
      }
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>



<style>
</style>
