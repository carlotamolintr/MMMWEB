<template>
  <v-container fluid fill-height justify-start column>
    <v-btn @click="getMap()"></v-btn>
    <div id="mapid"></div>

    <div>
      <v-flex v-for="(prueba, index) in registro" :key="index">{{prueba}}</v-flex>
    </div>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    error: " ",
    lat: " ",
    lon: " ",
    Specie: ["bottlenose", "pilot whale", "sperm whale"],
    numberIndividuals: "",
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    specie: "",
    registro: ""
  }),
  methods: {
    getMap() {
      var map = L.map("mapid").setView([51.505, -0.09], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([51.5, -0.09])
        .addTo(map)
        .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
        .openPopup();
    },

    getDataLocation() {
      firebase
        .database()
        .ref("dataCet")
        .on("value", data => {
          this.registro = Object.values(data.val());
        });
      console.log("houuu");
    }
  },
  created() {
    this.getDataLocation();
  }
};
</script>

<style>
/*Map boxes*/

#mapid {
  /*necesita la almohadilla para funcionar*/
  height: 50% !important;
  width: 90% !important;
  z-index: 0 !important;
}
</style>
