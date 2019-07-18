<template>
  <v-container fluid fill-height justify-start row>
    <v-card width="100%" height="80%" class="card-Box">
      <v-flex xs12 class="pa-4">
        <v-btn color="blue" v-on:click="gpsLocation()" class="ml-5">add gps location</v-btn>

        <v-text-field
          v-show="location == true"
          label="Latitude"
          readonly
          class="latLonBox"
          v-model="lat"
        ></v-text-field>
        <v-text-field
          v-show="location == true"
          label="Longitude"
          readonly
          class="latLonBox"
          v-model="lon"
        ></v-text-field>
        <p>{{error}}</p>
        <v-layout xs12></v-layout>
      </v-flex>

      <v-flex xs12 sm3>
        <v-text-field
          xs12
          :items="numberIndividuals"
          :counter="3"
          label="Number Individuals"
          required
          class="pa-4"
          type="number"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-select class="pa-4" v-model="specie" :items="Specie" label="Specie" required></v-select>
      </v-flex>
      <v-flex xs12 sm6>
        <v-btn align center @click="sendData()" type="button" color="primary" value="enviar">Send</v-btn>
      </v-flex>
    </v-card>
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
    registro: "",
    location: false
  }),

  methods: {
    gpsLocation: function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
        this.location = true;
      } else {
        this.error = "Geolocation is not supported.";
      }
    },
    showPosition: function(position) {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
    },
    sendData() {
      // creo una función para meter algunas variables en la base de datos
      let x = {
        lat: this.lat,
        lon: this.lon,
        specie: this.specie,
        numberIndividuals: this.numberIndividuals
      };

      firebase
        .database()
        .ref("dataCet") //Mi nueva base de datos se llama dataCet
        .push(x); //hago push de mi variable

      // limpia los botones para volver a enviar otro formulario. Los pongo de nuevo en blanco.
      this.lat = "";
      this.lon = "";
      this.Specie = "";
      this.location = false;
    },
    getDataLocation() {
      firebase
        .database()
        .ref("dataCet")
        .on("value", data => {
          this.registro = Object.values(data.val());
        });
      console.log("heheheh");
    }
  },
  created() {
    this.getDataLocation();
    // this.getMap();
  }
};
</script>

<style>
/*Map boxes*/
.card-Box {
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.822) !important;
  padding: 20px;
}

.latLonBox {
  margin: 0;
}
#mapid {
  /*necesita la almohadilla para funcionar*/
  height: 50% !important;
  width: 90% !important;
}
</style>
