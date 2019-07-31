<template>
  <v-container fill-height row>
    <v-layout row wrap fill-height>
      <v-flex xs12 height="500px" fill-height fluid>
        <h1>Sighting map</h1>

        <div align-center id="mapid" class="ma-1"></div>
      </v-flex>
    </v-layout>

    <!-- <div>
        <v-flex v-for="(prueba, index) in registro" :key="index">{{prueba}}</v-flex>
    </div>-->
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    error: " ",
    lat: " ",
    lon: " ",
    // Specie: ["bottlenose", "pilot whale", "sperm whale"],
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
      var map = L.map("mapid").setView([41.3976, 2.149], 4); // ([lat,lon], zoom)
      var myIcon = L.divIcon({ className: "my-div-icon" });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      //añado mis coordenadas guardadas en firebase:

      this.registro.forEach(m => {
        L.marker([m.lat, m.lon])
          .addTo(map)
          .bindPopup(
            "<p class='popupText'>Specie: " +
              m.specie +
              "</p>" +
              "<p class='popupText'>Number of individuals: " +
              m.numberIndividuals +
              "</p>" +
              "<p class='popupText'> Date: " +
              m.date +
              "</p>"
          )
          .openPopup();
      });

      // var circleMarker = L.circleMarker({
      //   color: "#ff33f5"
      // }).addTo(map);

      //Otra forma de hacerlo:

      //   for (let i = 0; i < this.registro.length; i++) {

      //     L.marker([this.registro[i].lat, this.registro[i].lon]).addTo(map);
      //     //   .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      //     //   .openPopup();
      //   }
    },

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
  }
};
</script>

<style>
/*Map boxes*/

#mapid {
  /*necesita la almohadilla para funcionar*/
  height: 70% !important;
  width: 97% !important;
  z-index: 0 !important;
}
.leaflet-popup-content {
  width: 200px;
}

.popupText {
  width: 100%;
}
</style>
