<template>
  <v-container class="contenedor">
    <v-layout xs12 column fill-height class="box-transparent">
      <v-flex align-center class="text-xs-center my-3">
        <h3 class="title-login">LOGIN TO YOUR ACCOUNT</h3>
        <v-btn
          @click="login()"
          class="mt-4 loginBtn loginBtn--google loginBtn--google:before loginBtn:before loginBtn:focus loginBtn:active"
        >Sign in with Google</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  data: function() {
    return {};
  },
  methods: {
    login: function() {
      var provider = new firebase.auth.GoogleAuthProvider(); // añadido desde documentación de firebase
      firebase
        .auth()
        .signInWithPopup(provider) // añadido desde doc. de firebase. con esto sale un pop-up para que te autentifiques
        .then(user => {
          console.log(user);

          if (user) {
            this.$store.commit("setUsers", firebase.auth().currentUser); // En el store mediante el setUsers se guards nuestros datos de autentificación.
          }
        });
      console.log("login");
    }
  }
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
/*Google button
/* Shared */
.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap !important;
  border-radius: 0.2em;
  font-size: 16px;
  color: #fff !important;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
}
/* Google */
.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #dd4b39 !important;
}
.loginBtn--google:before {
  border-right: #bb3f30 1px solid !important;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png")
    6px 6px no-repeat !important;
  opacity: 1.12;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #e74b37 !important;
}

/* Contenedor Login*/

.title-login {
  color: #fff;
  text-align: center;
  font-size: 24px;
}

.box-transparent {
  background-color: rgba(250, 246, 246, 0.411);
  height: 150px;
}
.contenedor {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
