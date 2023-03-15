<template>
  <div class="home">
    <v-container fluid fill-height>
      <v-row dense>
        <v-col :cols="4">
          <CardImageFrame :id="weatherDataRanked[0]?.id"></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame :id="weatherDataRanked[1]?.id"></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame :id="weatherDataRanked[2]?.id"></CardImageFrame>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col :cols="4">
          <CardImageFrame :id="weatherDataRanked[3]?.id"></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame :id="weatherDataRanked[4]?.id"></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame :id="weatherDataRanked[5]?.id"></CardImageFrame>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col :cols="4">
          <CardImageFrame :id="weatherDataRanked[6]?.id"></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame :id="weatherDataRanked[7]?.id"></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame :id="weatherDataRanked[8]?.id"></CardImageFrame>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import CardImageFrame from "@/components/CardImageFrame.vue";
import { getWeatherDataRanked } from "@/services/api/weatherDataBackend.service";
import { onMounted, ref } from "vue";

let weatherDataRanked = ref<{ id: number; likes: number }[]>([]);

onMounted(() => {
  getWeatherDataRankedFromBackend();
});

async function getWeatherDataRankedFromBackend() {
  weatherDataRanked.value = await getWeatherDataRanked();
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
