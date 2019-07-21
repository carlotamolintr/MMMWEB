<template >
  <v-container fluid fill-height justify-start row>
    <v-card width="100%" class="card-Box">
      <v-flex xs12 class="pa-4">
        <h1>Locate your sighting</h1>
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
          v-model="numberIndividuals"
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
      <v-flex></v-flex>
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <!-- <template v-slot:activator="{ on }"> -->
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Picker without buttons"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
        <!-- </template> -->
      </v-menu>
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
    Specie: [
      "Bottlenose dolphin",
      "Pilot whale",
      "Sperm whale",
      "Fin whale",
      "Common dolphin",
      "Killer whale"
    ],
    numberIndividuals: "",
    registro: "",
    location: false,
    date: new Date().toISOString().substr(0, 10),
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    menu2: false,
    specie: ""
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
        numberIndividuals: this.numberIndividuals,
        date: this.date
      };

      firebase
        .database()
        .ref("dataCet") //Mi nueva base de datos se llama dataCet
        .push(x); //hago push de mi variable

      // limpia los botones para volver a enviar otro formulario. Los pongo de nuevo en blanco.

      this.lat = "";
      this.lon = "";
      this.numberIndividuals = "";
      this.specie = "";
      this.location = false;
      this.date = new Date().toISOString().substr(0, 10);
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
  },
  computed: {
    dataSpecies() {
      return this.$store.getters.todasSpecies; // getters para coger la información del storage. DataSpecies actua ahora como una variable.
    }
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
