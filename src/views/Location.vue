<template>
  <v-container fluid fill-height justify-start>
    <v-layout xs12 column>
      <h1>Locatiojn page</h1>
      <v-btn color="blue" v-on:click="gpsLocation()" class="ml-5">add gps location</v-btn>
      <p>Lat = {{lat}} Lon ={{lon}}</p>
      <p>{{error}}</p>
      <v-layout xs12>
        <registro></registro>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import registro from "../components/registro";

export default {
  components: {
    registro
  },
  data() {
    return { error: " ", lat: " ", lon: " " };
  },

  methods: {
    gpsLocation: function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        this.error = "Geolocation is not supported.";
      }
    },
    showPosition: function(position) {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
    }
  }
};
</script>

<style>
</style>
