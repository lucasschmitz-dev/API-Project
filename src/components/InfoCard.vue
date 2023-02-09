<template>
  <div class="greetings">
    <h1 class="green">{{ title }}</h1>
    <div class="inline">
      <h3>Land:</h3>
      <h3>{{ location?.country }}</h3>
    </div>
    <div class="inline">
      <h3>Stadt:</h3>
      <h3>{{ location?.name }}</h3>
    </div>
    <div class="inline">
      <h3>Lat:</h3>
      <h3>{{ location?.lat }}</h3>
    </div>
    <div class="inline">
      <h3>Lon:</h3>
      <h3>{{ location?.lon }}</h3>
    </div>
    <div class="inline">
      <h3>Wetterstation:</h3>
      <h3>{{ weather?.name }}</h3>
    </div>
    <div class="inline">
      <h3>Wetter:</h3>
      <h3>{{ weather?.weather[0].description }}</h3>
    </div>
    <div class="inline">
      <h3>Temperatur:</h3>
      <h3>{{ weather?.main.temp }}</h3>
    </div>
    <div class="inline">
      <h3>Wind (m/s):</h3>
      <h3>{{ weather?.wind.speed }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LocationData } from "@/model/Location.model";
import type { WeatherData } from "@/model/Weather.model";
import { getWeather } from "@/services/api/weather.service";
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";

let store = useStore();
let location = ref<LocationData>();
let weather = ref<WeatherData>();

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

watchEffect(async () => {
  const data = store.getters.getLocation;
  if (data.name !== undefined) {
    location.value = data;
    weather.value = await callCurrentWeatherAPI(data.lat, data.lon);
    console.log(weather.value);
  }
});

async function callCurrentWeatherAPI(
  lat: number,
  lon: number
): Promise<WeatherData> {
  let result = await getWeather(lat, lon);
  if (Array.isArray(result)) {
    result = result[0];
  }
  if (result === undefined || result === null) {
    alert("Fehler bei der Wettersuche!");
  }
  return result;
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
}

.inline {
  display: flex;
  justify-content: space-between;
}
</style>
