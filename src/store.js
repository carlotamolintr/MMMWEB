import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase";

import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // variables globales 
    ui: "",
    user: null,
    specie: "",
    mensaje: "",
  },
  mutations: { // son sets, modifican el state sin tocarlo
    setUsers(state, value) {
      state.user = value // le digo que la variable global user va a pasar a ser un valor.
    },
    setSpecies(state, value) {
      state.specie = value
    },



  },
  actions: { // añadir funciones
    // createUI(context) {
    //   context.state.ui = new firebaseui.auth.AuthUI(firebase.auth());
    // },
    async getJson(context) {
      await axios // con axios uso arrow function con fetch no!
        .get("https://run.mocky.io/v3/3ed9a783-f7ee-4e3a-a3a4-e8900cfbd422")

        .then(response => (context.commit("setSpecies", response.data)))
      console.log("jbgj")
    },
  },
  getters: {
    todasSpecies(state) {
      return state.specie;
    },
    nombreUsuario(state) {
      return state.user;
    }
  }

});