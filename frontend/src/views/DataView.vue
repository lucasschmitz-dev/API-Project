<template>
  <div class="home">
    <v-container fluid fill-height>
      <v-row dense>
        <v-col :cols="4">
          <CardImageFrame :id="displayedData[0]?.id"></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame :id="displayedData[1]?.id"></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame :id="displayedData[2]?.id"></CardImageFrame>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col :cols="4">
          <CardImageFrame :id="displayedData[3]?.id"></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame :id="displayedData[4]?.id"></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame :id="displayedData[5]?.id"></CardImageFrame>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col :cols="4">
          <CardImageFrame :id="displayedData[6]?.id"></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame :id="displayedData[7]?.id"></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame :id="displayedData[8]?.id"></CardImageFrame>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="amountOfPages"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        ></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import CardImageFrame from "@/components/CardImageFrame.vue";
import { getWeatherDataRanked } from "@/services/api/weatherDataBackend.service";
import { watch } from "vue";
import { onMounted, ref } from "vue";

let weatherDataRanked = ref<{ id: number; likes: number }[]>([]);
let page = ref<number>(1);
let amountOfPages = ref<number>();
let displayedData = ref<{ position: number; id: number }[]>([]);

onMounted(() => {
  getWeatherDataRankedFromBackend();
});

watch(
  () => page.value,
  () => {
    getWeatherDataRankedFromBackend();
  }
);

async function getWeatherDataRankedFromBackend() {
  weatherDataRanked.value = await getWeatherDataRanked();
  calcAmountOfPages();
  calcDisplayedData();
}

function calcAmountOfPages() {
  amountOfPages.value = Math.ceil(weatherDataRanked.value.length / 9);
}

function calcDisplayedData() {
  displayedData.value = [];
  for (let i = 0; i < 9; i++) {
    displayedData.value.push({
      position: i + (page.value - 1) * 9,
      id: weatherDataRanked?.value[i + (page.value - 1) * 9]?.id,
    });
  }
}
</script>

<style scoped>
.home {
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-card {
  margin: 5px;
}

@media (min-width: 1330px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
    gap: 80px;
    width: 22em;
  }
}
</style>
