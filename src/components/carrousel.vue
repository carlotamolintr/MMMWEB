<template>
  <v-carousel hide-delimiters height="260px">
    <v-carousel-item v-for="trip in trips" :src="trip.imageUrl" :key="trip.id">
      <div class="title">{{trip.title}}</div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      trips: [
        {
          imageUrl:
            "https://cdn.pixabay.com/photo/2015/08/30/17/56/common-dolphins-914548_1280.jpg",
          title: "Common dolphins",
          id: "sdgkjdfojg"
        },
        {
          imageUrl:
            "https://cdn.pixabay.com/photo/2017/03/02/16/59/bottlenose-dolphin-2111839_1280.jpg",
          title: "Pilot whale",
          id: "dfdffd"
        },

        {
          imageUrl:
            "https://images.pexels.com/photos/219945/pexels-photo-219945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          title: "Killer whale",
          id: "skdjfin"
        },
        {
          imageUrl:
            "https://cdn.pixabay.com/photo/2015/09/02/12/55/dolphins-918752_1280.jpg",
          title: "Bottlenose dolphin",
          id: "jjjk"
        }
      ]
    };
  }
};
</script>

<style>
.title {
  position: absolute;
  bottom: 20px;
  left: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}
</style>
