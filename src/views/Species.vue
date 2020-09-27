<template>
  <v-container fluid fill-height class="letterFont">
    <v-layout sm5 md5 lg4 xl4 justify-center v-if="todasSpecies.length != 0">
      <cards :dataSpecies="todasSpecies"></cards>
    </v-layout>
  </v-container>
</template>

<script>
  import store from '../store.js';
  import cards from "../components/cards";
  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex'

  export default {
    components: {
      cards
    },
    computed: {
      ...mapGetters(['todasSpecies'])
    },
  };
</script>

<style>
  .letterFont {
    font-family: "Oswald", sans-serif;
  }
</style>