<template>
  <v-content class="paddingTop" fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4 fill-height class="backgroundColor">
        <v-toolbar class="elevation-12" dark color="primary darken-1">
          <v-toolbar-title>Chat</v-toolbar-title>
        </v-toolbar>
        <v-card class="logs" height="480px" id="parent">
          <div id="mensajes" ref="chat" v-for="(m, index) in mensajes" :key="index">
            <!--Mensajes de los otros. si el m.name es desigual a el usuario que hay en el storage, tiene una clase.-->
            <div
              v-if="m.name != loggedName"
              left
              class="ma-3 pa-3 user-bubble user-bubble:after right"
            >
              <v-flex>{{m.name}} wrote:</v-flex>
              <v-flex>{{m.text}}</v-flex>
            </div>
            <!--Mensajes del usuario. si el m.name es igual a el usuario que hay en el storage, tiene otra clase-->
            <div v-else right class="ma-3 pa-3 user-bubble2 user-bubble2:after left">
              <v-flex>{{m.name}} wrote:</v-flex>
              <v-flex>{{m.text}}</v-flex>
            </div>
          </div>
        </v-card>

        <div fill-height class="elevation-12 color-boxSumbit">
          <v-flex fill-height justify-start height="150px">
            <!--@keyup.enter permite enviar el mensjae clickando enter-->

            <v-text-field
              auto-grow
              textarea
              rows="2"
              placeholder="Enter something..."
              class="colorWriting pa-3"
              xs12
              width="100%"
              v-model="text"
              @keyup.enter="sendMessage()"
            ></v-text-field>
          </v-flex>
          <v-btn dark align-center class="primary darken-1 ml-2" @click="sendMessage()">Send</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    text: "",
    mensajes: ""
  }),
  methods: {
    sendMessage: function() {
      let name = firebase.auth().currentUser.displayName; // Que imprima la variable name
      let objectToSend = {
        text: this.text, // si key and value son iguales, solamente hay que poner uno.
        name: name
      };
      console.log(objectToSend);

      firebase
        .database()
        .ref("chat")
        .push(objectToSend); // accede a la base de datos y pushea la información acumulandola
      console.log("hei");
      this.text = "";
    },

    getMessages: function() {
      firebase
        .database()
        .ref("chat")
        .on("value", data => {
          // el on es como un eventlistener
          this.mensajes = Object.values(data.val());
        });
      console.log(this.mensajes);
    },

    scroll() {
      // Esta función hace el scroll down. Igualando el top de la caja con la altura.
      document.getElementById("parent").scrollTop = document.getElementById(
        "parent"
      ).scrollHeight;
    }
  },
  computed: {
    loggedName() {
      // nos devuelve en cada momento el nombre del usuario almacenado en el storage.
      return this.$store.state.user.displayName;
    }
  },
  created() {
    this.getMessages();
  },
  updated() {
    this.scroll();
  }
};
</script>

<style>
.backgroundColor {
  z-index: 1;
}
.paddingTop {
  padding-top: 10px !important;
}
.positionBlocked {
  position: absolute;
  bottom: 40%;
}
.logs {
  overflow: auto;
  background-color: #88dbf073 !important;
}

.p {
  margin: 0;
  width: 95% !important;
}
.colorWriting {
  color: black;
  width: 80%;
  margin-left: 2%;
}
.color-boxSumbit {
  background-color: white;
}

/* User-bubble contenedor*/

.user-bubble {
  position: relative;
  background: #88dbf0;
  border-radius: 0.4em;
  width: 60%;
  min-height: 10%;
  word-wrap: break-word;
  white-space: normal;
  height: auto;
}

.user-bubble2 {
  position: relative;
  background: #95e9c1;
  border-radius: 0.4em;
  width: 60%;
  min-height: 10%;
  word-wrap: break-word;
  white-space: normal;
  height: auto;
}
/* User bubble arrow*/
.user-bubble:after {
  content: "";
  position: absolute;
  border-style: solid;
  border-width: 18px 12px 0;
  border-color: #88dbf0 transparent;
  display: block;
  width: 0;
  z-index: 1;
  bottom: -15px;
  left: 190px;
}
.user-bubble2:after {
  content: "";
  position: absolute;
  border-style: solid;
  border-width: 18px 12px 0;
  border-color: #95e9c1 transparent;
  display: block;
  width: 0;
  z-index: 1;
  bottom: -15px;
  left: 190px;
}

/*autoscroll mensajes*/
/* #mensajes {
  overflow-y: auto;
} */
#parent {
  scroll-behavior: smooth;
}
</style>
