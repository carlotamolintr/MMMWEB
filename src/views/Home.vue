<template>
  <v-container fluid xs12>
    <v-layout xs12 class="justify-center">
      <v-flex width="100%" class="md5 lg5 xl4">
        <h1>MEDITERRANEAN MARINE MAMMALS</h1>

        <v-flex class="box-text ma-1 all">
          <p class="pa-2 all">The Mediterranean is a semi-enclosed sea with diverse oceanographic dynamics and water
            circulation patterns which result in surges of biological productivity in different places and at different
            times. Its rich and unique biodiversity has led to its recognition as one of the most important biodiversity
            hotspots in the world, including marine mammals and sea turtles that live in and migrate through the sea.
          </p>

          <v-spacer></v-spacer>
          <v-layout fill-height fluid width="100%" class="ma-1">
            <carrousel align-center></carrousel>
          </v-layout>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import carrousel from "../components/carrousel";

  export default {
    components: {
      carrousel
    }
  };
</script>

<style>
  h1 {
    color: #002747 !important;
    text-align: center;
    margin-top: 2%;
    margin-bottom: 3%;

    font-size: 34px;
  }

  p {
    width: 100%;
  }

  .all {
    width: 100%;
  }

  .box-text {
    border-radius: 25px;
    background-color: rgb(255, 255, 255) !important;
    padding: 20px;
    text-align: justify;
  }
</style>