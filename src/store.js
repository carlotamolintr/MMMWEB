import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase";
import firebaseui from "firebaseui";
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // variables globales 
    ui: "",
    user: null,
    specie: "",
  },
  mutations: { // son sets, modifican el state sin tocarlo
    setUsers(state, value) {
      state.user = value // le digo que la variable global user va a pasar a ser un valor.
    },
    setSpecies(state, value) {
      state.specie = value
    }


  },
  actions: { // añadir funciones
    // createUI(context) {
    //   context.state.ui = new firebaseui.auth.AuthUI(firebase.auth());
    // },
    getJson(context) {
      axios // con axios uso arrow function con fetch no!
        .get("https://api.myjson.com/bins/11rnpb")

        .then(response => (context.commit("setSpecies", response.data)))
      console.log("jbgj")
    },
  },
  getters: {
    todasSpecies(state) {
      return state.specie;
    }
  }

});
