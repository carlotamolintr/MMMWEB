<template>
  <v-container fluid fill-height class="letterFont">
    <v-layout sm5 md5 lg4 xl4 justify-center v-if="$store.getters.todasSpecies.length != 0">
      <cards></cards>
    </v-layout>
  </v-container>
</template>

<script>
  import cards from "../components/cards";

  export default {
    components: {
      cards
    }
  };
</script>

<style>
  .letterFont {
    font-family: "Oswald", sans-serif;
  }
</style>