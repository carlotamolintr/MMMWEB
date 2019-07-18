<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <material-card class="v-card-profile">
        <v-avatar slot="offset" class="mx-auto d-block" size="130">
          <v-img v-if="dataUser.photoURL !=null" :src="dataUser.photoURL"></v-img>
          <!-- :src para cuando quiero poner una variable en src="variable"-->
          <!-- route to the image-->
          <!-- si no hay imagen, mostrar avatar -->
        </v-avatar>
        <v-card-text class="text-xs-center white">
          <h6 class="category text-gray font-weight-thin mb-3">{{dataUser.displayName}}</h6>
          <h4 class="card-title font-weight-light">{{}}</h4>
          <!-- <p class="font-weight-light text-xs-center">
            sndgfjdfnjgbdfjn gndf gdjf
            sfgijdf
            gdfgdfg
            fdgd
            fag
            dafh
          </p>-->
        </v-card-text>
      </material-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    dataUser() {
      return this.$store.getters.nombreUsuario;
    }
  }
};
</script>

<style>
.h6 {
  font-family: ;
}
</style>
