<template>
  <v-content class="paddingTop" fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4 fill-height class="backgroundColor">
        <v-toolbar class="elevation-12" dark color="light-blue darken-4">
          <v-toolbar-title>Chat</v-toolbar-title>
        </v-toolbar>
        <v-card class="logs" height="460px" id="parent" fluid fill-height>
          <div id="mensajes" ref="chat" v-for="(m, index) in mensajes" :key="index">
            <!--Mensajes de los otros. si el m.name es desigual a el usuario que hay en el storage, tiene una clase.-->
            <div
              v-if="m.name != loggedName"
              left
              class="ma-3 pa-3 user-bubble user-bubble:after left"
            >
              <v-layout row wrap>
                <v-avatar left size="26px">
                  <!-- <v-img :src="m.avatar"></v-img> -->
                </v-avatar>
                <v-flex right>{{m.name}}:</v-flex>
              </v-layout>
              <v-flex>{{m.text}}</v-flex>
            </div>
            <!--Mensajes del usuario. si el m.name es igual a el usuario que hay en el storage, tiene otra clase-->
            <div v-else right class="ma-3 pa-3 user-bubble2 user-bubble2:after right">
              <v-avatar size="36px">
                <v-img :src="m.avatar"></v-img>
              </v-avatar>
              <v-flex>{{m.name}}:</v-flex>
              <v-flex>{{m.text}}</v-flex>
            </div>
          </div>
        </v-card>

        <div fluid fill-height class="elevation-12 color-boxSumbit">
          <v-layout row wrap>
            <!--@keyup.enter permite enviar el mensjae clickando enter-->
            <v-flex xs10>
              <v-text-field
                xs4
                textarea
                rows="1"
                placeholder="Enter something..."
                class="colorWriting pa-3"
                v-model="text"
                @keyup.enter="sendMessage()"
              ></v-text-field>
            </v-flex>
            <v-flex xs1>
              <v-btn dark xs1 icon width="10%" class="primary darken-1 mt-4" @click="sendMessage()">
                <v-icon class="pl-1">send</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
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
      let avatar = firebase.aut().currentUser.photoURL;
      let objectToSend = {
        text: this.text, // si key and value son iguales, solamente hay que poner uno.
        name: name,
        avatar: this.firebase.aut().currentUser.photoURL
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
  background-color: #f4f7f8b4 !important;
}

.p {
  margin: 0;
  width: 95% !important;
}
.colorWriting {
  color: black;
  /* width: 60%; */
  margin-left: 2%;
}
.color-boxSumbit {
  background-color: white;
  margin: 0;
}

/* User-bubble contenedor*/

.user-bubble {
  position: relative;
  background: #b3e5fc;
  border-radius: 0.4em;
  width: 60%;
  min-height: 10%;
  word-wrap: break-word;
  white-space: normal;
  height: auto;
  font-size: 14px;
}

.user-bubble2 {
  position: relative;
  background: #4fc3f7;
  border-radius: 0.4em;
  width: 60%;
  min-height: 10%;
  word-wrap: break-word;
  white-space: normal;
  height: auto;
  font-size: 14px;
}
/* User bubble arrow*/
.user-bubble:after {
  content: "";
  position: absolute;
  border-style: solid;
  border-width: 18px 12px 0;
  border-color: #b3e5fc transparent;
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
  border-color: #4fc3f7 transparent;
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
