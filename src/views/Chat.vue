<template>
  <v-content xs10 row>
    <v-flex xs12 id="mensajes">
      <div v-for="m in mensajes" :key="m">
        <p>{{m.text}}</p>

        <p>{{m.name}}</p>
      </div>
    </v-flex>

    <v-text-field xs12 v-model="text"></v-text-field>
    <v-btn @click="sendMessage()"></v-btn>
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
</style>
