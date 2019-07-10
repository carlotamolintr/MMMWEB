<template>
  <v-container class="cajaBlanca">
    <h2>registro</h2>
    <form>
      <v-flex xs12 sm6 d-flex>
        <v-select :items="Specie" label="Specie" required></v-select>
      </v-flex>

      <v-flex xs5 sm3 d-flex>
        <v-text-field
          :items="numberIndividuals"
          :counter="3"
          label="Number Individuals"
          required
          type="number"
        ></v-text-field>
      </v-flex>
    </form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    Specie: ["bottlenose", "pilot whale", "sperm whale"],
    numberIndividuals: "",
    items: ["Item 1", "Item 2", "Item 3", "Item 4"]
  })
};
</script>



<style>
.cajaBlanca {
  background-color: beige;
}
</style>
