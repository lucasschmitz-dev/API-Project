<template>
  <v-card class="dialogWrapper">
    <v-card-text>
      <v-container>
        <div class="greetings">
          <h1 class="green">
            {{ weatherData.city }}, {{ weatherData.country }}
          </h1>
        </div>
        <v-row align="center">
          <v-col class="firstCol">
            <div class="inline">
              <h3>Land:</h3>
              <h3>{{ weatherData.country }}</h3>
            </div>
            <div class="inline">
              <h3>Stadt:</h3>
              <h3>{{ weatherData.city }}</h3>
            </div>
            <div class="inline">
              <h3>Lat:</h3>
              <h3>{{ weatherData.lat }}</h3>
            </div>
            <div class="inline">
              <h3>Lon:</h3>
              <h3>{{ weatherData.lon }}</h3>
            </div>
            <div class="inline">
              <h3>Wetterstation:</h3>
              <h3>{{ weatherData.stationName }}</h3>
            </div>
            <div class="inline">
              <h3>Wetter:</h3>
              <h3>{{ weatherData.weatherDescription }}</h3>
            </div>
            <div class="inline">
              <h3>Temperatur:</h3>
              <h3>{{ weatherData.temp }}</h3>
            </div>
            <div class="inline">
              <h3>Wind (m/s):</h3>
              <h3>{{ weatherData.windSpeed }}</h3>
            </div>
            <div class="inline">
              <h3>Likes:</h3>
              <h3>{{ weatherData?.likes }}</h3>
            </div>
            <div class="inline">
              <h3>Erstellt am:</h3>
              <h3>{{ timeStamp }}</h3>
            </div>
          </v-col>
          <v-col align="center">
            <v-img
              v-bind:src="'data:image/jpeg;base64,' + weatherData?.imageData"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              aspect-ratio="1"
              cover
              width="500px"
            >
              <v-btn
                class="downloadIcon"
                size="x-large"
                color="surface-variant"
                variant="text"
                icon="mdi-tray-arrow-down"
                @Click="download($event)"
                download
              ></v-btn
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Weatherdata } from "@/model/Weatherdata.model";
import { downloadImage } from "@/services/utils";
import { ref } from "vue";

let timeStamp = ref();

const props = defineProps({
  weatherData: {
    type: Weatherdata,
    required: true,
  },
});

timeStamp.value =
  new Date(props.weatherData.timeStamp).toLocaleDateString() +
  " um " +
  new Date(props.weatherData.timeStamp).toLocaleTimeString();

function download(e: any) {
  e.stopPropagation();
  downloadImage(props.weatherData);
}
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
  margin-left: 2rem;
}

.inline {
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
}

.greetings {
  position: absolute;
}

@media (max-width: 1330px) {
  .firstCol {
    margin-top: 70px;
  }
}

.downloadIcon {
  float: right;
}
</style>
