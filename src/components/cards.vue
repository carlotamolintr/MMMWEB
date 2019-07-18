<template>
  <!--buscador-->
  <v-flex xs12 sm12 offset-sm3>
    <v-flex xs12 sm12 class="moreOpacity buscador" fluid width="100">
      <v-text-field v-model="search" append-icon="search" single-line hide-details class="mx-2"></v-text-field>
    </v-flex>
    <v-flex xs12 sm12 class="moreOpacity buscador" fluid width="100">
      <v-layout row wrap xs12 sm12 class="mx-0 mb-4" fluid width="100%">
        <v-layout xs4 sm4 style="float:left" width="100%" class="moreOpacity buscador">
          <v-switch
            xs4
            sm12
            class="mt-1"
            v-model="filterWhales"
            label="Whales"
            color="indigo darken-3"
            value="Whales"
            hide-details
          ></v-switch>
        </v-layout>
        <v-layout xs4 sm12 style="float:left" width="100%" class="moreOpacity buscador">
          <v-switch
            xs4
            class="mt-1 mx-0"
            v-model="filterWhales"
            label="Dolphins"
            color="indigo darken-3"
            value="Dolphins"
            hide-details
          ></v-switch>
        </v-layout>
        <v-layout xs4 sm12 style="float:left" width="100%" class="moreOpacity buscador">
          <v-switch
            xs4
            sm4
            class="mt-1 mx-0"
            v-model="filterWhales"
            label="Seals"
            color="indigo darken-3"
            value="Seals"
            hide-details
          ></v-switch>
        </v-layout>
      </v-layout>
    </v-flex>

    <!--Construyo la card-->
    <v-card
      class="ma-2 my-4 semi-transparent"
      v-for="(specie, index) in searchField"
      :key="specie.AcceptedCommonName"
    >
      <v-img :src="specie.image" max-height="170px" width="100%" class="thumbnail hidden-md-and-up"></v-img>
      <v-img
        :src="specie.image"
        max-height="240px"
        width="100%"
        class="thumbnail hidden-md-and-down"
      ></v-img>

      <v-card-title primary-title class="moreOpacity">
        <h3 class="headline mb-0">{{specie.AcceptedCommonName}}</h3>

        <v-flex v-show="show == index" style="width:100%">
          <v-flex xs12 sm6>
            <v-layout class="mt-2">
              <p>Scientific Name:</p>
              <h4>{{specie.ScientificName}}</h4>
            </v-layout>
            <div v-show="specie.AlternateCommonName !== undefined">Alternative Common Name:</div>
            <div v-for="sp in specie.AlternateCommonName" :key="sp.AlternateCommonName">
              <ul class="pList">{{sp}}</ul>
            </div>
          </v-flex>
        </v-flex>
      </v-card-title>
      <!-- Buttons-->
      <v-card-actions class="moreOpacity">
        <!-- <v-btn flat color="blue">Share</v-btn> -->
        <v-btn flat v-on:click="select(specie)" color="blue">Wiki Info</v-btn>

        <v-btn icon @click="eyeCheck(specie)">
          <v-icon
            :class="{'blue--text': specie.fav == true, 'grey--text': !specie.fav || specie.fav == false}"
            flat
          >{{specie.fav!= true ? 'remove_red_eye' : 'remove_red_eye' }}</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <!-- <v-spacer></v-spacer> -->
        <v-btn icon @click="arrow(index)">
          <v-icon>{{ show != index ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          <!--Si se cumple show != index -> pasará lo primero. Sinó lo seguno-->
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>





<script>
// import axios from "axios";
export default {
  data() {
    return {
      search: "",
      filterWhales: ["Whales", "Dolphins", "Seals"], // añado todos los valores para que los checkboxes salgan seleccionados
      show: -1 // Le indicamos que será -1 de inicio (no hay ninguna card que sea -1). Por tanto al principio no se despliega.
    };
  },

  methods: {
    select: function(specie) {
      // Función que pone los links
      window.location = specie.url;
    },
    arrow: function(index) {
      //
      if (this.show == index) {
        this.show = -1;
      } else {
        this.show = index;
      }
    },
    eyeCheck: function(card) {
      if (!card.fav) {
        // si no existe esta propiedad. Me la invento, y equivale a true.
        card.fav = true;
      } else {
        card.fav = false;
      }
      this.$forceUpdate(); // Esta función fuerza a que se refresque la información de los ojitos.
    }
  },

  computed: {
    // user() {
    //   return this.$store.state.ui;
    // },
    searchField() {
      return this.dataSpecies.filter(specie => {
        let buscador =
          specie.ScientificName.toLowerCase().includes(
            this.search.toLowerCase()
          ) ||
          specie.AcceptedCommonName.toLowerCase().includes(
            this.search.toLowerCase()
          );
        let checkbox =
          this.filterWhales.includes(specie.Group) ||
          this.filterWhales.length == 0; // o que se muestren todos.

        return buscador && checkbox;
      });
    },
    dataSpecies() {
      return this.$store.getters.todasSpecies; // getters para coger la información del storage. DataSpecies actua ahora como una variable.
    }
  }
};
</script>

<style>
.rounded-card {
  border-radius: 50px;
}

h4 {
  font-style: italic;
  font-weight: normal;
  box-sizing: content-box !important;
  width: 100% !important;
}
p {
  width: 60%;
  font-size: 14px !important;
}
.pList {
  padding-left: 5%;
  list-style-type: circle !important;
}

.semi-transparent {
  background-color: rgba(245, 245, 252, 0.61) !important;
}

.moreOpacity {
  background-color: white;
}

.buscador {
  margin-left: 9px;
  margin-right: 10px;
}
.checkboxes {
  padding-left: 9px;
  margin-top: 2%;
}
</style>
