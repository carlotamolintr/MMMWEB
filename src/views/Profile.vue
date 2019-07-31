<template>
  <v-container fill-height fluid grid-list-xl>
    <v-card width="100%" height="80%" class="card-Box">
      <material-card class="v-card-profile">
        <v-avatar slot="offset" class="mx-auto d-block" size="130">
          <v-img v-if="dataUser.photoURL !=null" :src="dataUser.photoURL"></v-img>
          <!-- :src para cuando quiero poner una variable en src="variable"-->

          <!-- si no hay imagen, mostrar avatar -->
        </v-avatar>
        <v-card-text class="text-xs-center">
          <h6 class="name">{{dataUser.displayName}}</h6>
          <!-- <h4 class="card-title font-weight-light">{{}}</h4> -->

          <v-btn @click="getFavs"></v-btn>
          <v-card v-for="f in favs" :key="f.commonName">{{f.commonName}}</v-card>
        </v-card-text>
      </material-card>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    favs: ""
  }),
  methods: {
    getFavs() {
      // Obtengo mis favoritos
      let userId = firebase.auth().currentUser.uid;
      console.log(userId);
      firebase
        .database()
        .ref("usersLike/" + userId)
        // .equalTo("userID")
        // .equalTo("/JLW9WkbpHiNnQNYfyi0DrWhRtG92")
        .on("value", data => {
          // el on es como un eventlistener
          this.favs = Object.values(data.val());
        });
      console.log(this.favs);
    }
  },
  computed: {
    dataUser() {
      return this.$store.getters.nombreUsuario;
    },
    UserID() {
      return this.$store.state.user.uid;
    }
  },
  created() {
    // this.getFavs;
  }
};
</script>

<style>
.name {
  font-family: "Yanone Kaffeesatz", sans-serif;
  font-size: 20px !important;
}

.card-Box {
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.822) !important;
  padding: 20px;
}
</style>
