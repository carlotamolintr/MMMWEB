<template>
  <v-container fluid fill-height justify-start>
    <v-layout column>
      <!-- <v-btn @click="getMap();"></v-btn> -->
      <div id="mapid"></div>

      <!-- <div>
        <v-flex v-for="(prueba, index) in registro" :key="index">{{prueba}}</v-flex>
      </div>-->
    </v-layout>
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
    registro: [],

    i: 0,

    dataConverted: [],
    newData: []
  }),
  methods: {
    /* Print my map on the page*/
    getMap() {
      var map = L.map("mapid").setView([38.875, 1.828], 1); // ([lat,lon], zoom)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      this.registro.forEach(m => {
        L.marker([m.lat, m.lon]).addTo(map);
      });

      //   for (let i = 0; i < this.registro.length; i++) {

      //     L.marker([this.registro[i].lat, this.registro[i].lon]).addTo(map);
      //     //   .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      //     //   .openPopup();
      //   }
    },

    /* add markers on the page*/
    // addMarker() {
    //   var mymap = L.map("mapid").setView([36.723, -3.7083], 13);
    //   L.tileLayer(
    //     "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    //     {
    //       attribution:
    //         'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //       maxZoom: 18,
    //       id: "mapbox.streets",
    //       accessToken: "your.mapbox.access.token"
    //     }
    //   ).addTo(map);
    //   console.log("my markers");
    // },
    /* Databse from firebase that contains my saved locations*/
    getDataLocation() {
      firebase
        .database()
        .ref("dataCet")
        .on("value", data => {
          this.registro = Object.values(data.val());
          this.getMap();
        });
      console.log("houuu");
    }
  },
  created() {},
  mounted() {
    this.getDataLocation();
    // this.getMap();
    // this.addMarker();
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
