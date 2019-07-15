<template>
  <v-content fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12" color="primary lighten-4">
          <v-toolbar dark color="primary darken-1">
            <v-toolbar-title>Chat</v-toolbar-title>
          </v-toolbar>

          <div id="mensajes" ref="chat" class="logs" v-for="(m, index) in mensajes" :key="index">
            <!-- <v-layout v-if="m.name != user"></v-layout> -->
            <div right class="ma-2 pa-2 user-bubble user-bubble:after right">
              <p>{{m.name}} wrote:</p>
              <p>{{m.text}}</p>
            </div>
          </div>
        </v-card>

        <v-text-field xs12 v-model="text"></v-text-field>
        <v-btn @click="sendMessage()"></v-btn>
      </v-flex>
    </v-layout>
  </v-content>
  <!-- </v-layout>
    <v-flex xs12 id="mensajes">
      <div v-for="m in mensajes" :key="m">
        <p>{{m.text}}</p>

        <p>{{m.name}}</p>
      </div>
    </v-flex>

    <v-text-field xs12 v-model="text"></v-text-field>
    <v-btn @click="sendMessage()"></v-btn>
  </v-content>-->

  <!-- <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12" color="primary lighten-4">
          <v-toolbar dark color="primary darken-1">
            <v-toolbar-title>Chat</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-list>
              <template v-for="m in mensajes">
                <v-subheader v-if="item" :key="m">{{ m.name }}</v-subheader>

                <v-subheader :key="m">{{m.text}}</v-subheader>
              </template>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="sendMessage()"></v-btn>
            <v-text-field v-model="text" label="Message" single-line solo-inverted></v-text-field>
            <v-btn fab dark small color="primary">
              <v-icon dark>send</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>-->
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
      //   var text = document.getElementById("text").value;
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
.positionBlocked {
  position: absolute;
  bottom: 40%;
}
.logs {
  height: 100px;
  overflow: auto;
}

/* User-bubble */

.user-bubble {
  position: relative;
  background: #00aabb;
  border-radius: 0.4em;
  width: 60%;
  min-height: 10%;
}

.user-bubble:after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  width: 0;

  border: 22px solid transparent;
  border-left-color: #00aabb;
  border-right: 0;
  border-bottom: 0;
  margin-left: -20px;
  margin-bottom: -20px;
}
</style>
