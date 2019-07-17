<template>
  <v-content class="paddingTop" fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4 fill-height class="backgroundColor">
        <v-toolbar class="elevation-12" dark color="primary darken-1">
          <v-toolbar-title>Chat</v-toolbar-title>
        </v-toolbar>
        <v-card class="logs" color="primary lighten-4" height="480px">
          <div id="mensajes" ref="chat" v-for="(m, index) in mensajes" :key="index">
            <!-- <v-layout v-if="m.name != user"></v-layout> -->
            <div
              v-if="m.name != loggedName"
              left
              class="ma-3 pa-3 user-bubble user-bubble:after right"
            >
              <v-flex>{{m.name}} wrote:</v-flex>
              <v-flex>{{m.text}}</v-flex>
            </div>

            <div v-else="loggedName" right class="ma-3 pa-3 user-bubble2 user-bubble:after left">
              <v-flex>{{m.name}} wrote:</v-flex>
              <v-flex>{{m.text}}</v-flex>
            </div>
          </div>
        </v-card>
        <div fill-height class="elevation-12">
          <v-text-field
            auto-grow
            textarea
            rows="2"
            placeholder="Enter something..."
            class="colorWriting"
            oscrollable
            xs12
            v-model="text"
          ></v-text-field>
          <v-btn dark color="primary darken-1" @click="sendMessage()">Send</v-btn>
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
    }
  },
  computed: {
    loggedName() {
      return this.$store.state.user.displayName;
    }
  },
  created() {
    this.getMessages();
  }
};
</script>

<style>
.backgroundColor {
  background-color: #caf0f3 !important;
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
}
.scroll {
  overflow: auto;
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

/* User-bubble contenedor*/

.user-bubble {
  position: relative;
  background: #00abbb;
  border-radius: 0.4em;
  width: 60%;
  min-height: 10%;
  word-wrap: break-word;
  white-space: normal;
  height: auto;
}

.user-bubble2 {
  position: relative;
  background: #af62ab;
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
  border-color: #00abbb transparent;
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
</style>
