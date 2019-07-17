<template>
  <v-container fluid fill-height justify-start>
    <form>
      <v-flex xs5 sm3 d-flex>
        <v-text-field
          :items="numberIndividuals"
          :counter="3"
          label="Number Individuals"
          required
          type="number"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 d-flex>
        <v-select v-model="specie" :items="Specie" label="Specie" required></v-select>
      </v-flex>

      <input @click="sendData()" type="button" value="enviar" />
    </form>
    <v-layout xs12 column>
      <h1>Locatiojn page</h1>
      <v-btn color="blue" v-on:click="gpsLocation()" class="ml-5">add gps location</v-btn>
      <p>Lat = {{lat}} Lon ={{lon}}</p>
      <p>{{error}}</p>
      <v-layout xs12></v-layout>
    </v-layout>
    <div>
      <v-flex v-for="(prueba, index) in registro" :key="index">{{prueba}}</v-flex>
    </div>
  </v-container>
</template>

<script>
// import leaflet from "leaflet";
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

#mapid {
  /*necesita la almohadilla para funcionar*/
  height: 50% !important;
  width: 90% !important;
}
/* .container {
  display: flex;
  flex-direction: column-reverse;
  min-height: 800px;
}

.picBox {
  flex: 5;
  background-image: url(https://placeimg.com/1000/1000/tech);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.mapBox {
  flex: 5;
  position: relative;
  border: 1px solid red;
}

.infoBox {
  flex: 20;
  border: 1px solid blue;
  display: none;
} */
</style>
