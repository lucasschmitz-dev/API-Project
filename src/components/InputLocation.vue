<template>
  <v-sheet width="300" class="mx-auto" style="background-color: transparent">
    <v-form @submit.prevent="submit">
      <v-text-field
        v-model="city"
        :rules="rules"
        label="Stadt"
        hint="Bitte Stadt mit vollem Namen eingeben"
      ></v-text-field>
      <v-btn
        :loading="loading"
        :disabled="loading"
        type="submit"
        block
        class="mt-2"
        style="color: #00bd7e"
        >Bestätigen</v-btn
      >
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import type { ImageData } from "@/model/ImageB64.model";
import type { LocationData } from "@/model/Location.model";
import type { WeatherData } from "@/model/Weather.model";
import { getLocationByName } from "@/services/api/geocoding.service";
import { createImage } from "@/services/api/textToImage.service";
import { getWeather } from "@/services/api/weather.service";
import { ref } from "vue";
import { useStore } from "vuex";

const emit = defineEmits<{
  (e: "loading", value: boolean): void;
}>();

let store = useStore();

let loading = ref<boolean>(false);
let city = ref<string>("");
let rules = [
  (value: string) => {
    if (value) return true;
    return "Eingabe darf nicht leer sein!";
  },
];

async function submit(event: any) {
  const result = await event;
  if (result.valid === true) {
    loading.value = true;
    let geoCodingResult = await callGeocodingAPI(city.value);
    if (geoCodingResult === undefined) {
      loading.value = false;
      return;
    }
    let weatherResult = await callCurrentWeatherAPI(
      geoCodingResult.lat,
      geoCodingResult.lon
    );
    if (weatherResult === undefined) {
      loading.value = false;
      return;
    }
    if (geoCodingResult !== undefined && weatherResult !== undefined) {
      store.commit("changeLocation", geoCodingResult);
      store.commit("changeWeather", weatherResult);
    }
    let promt = [
      geoCodingResult.country,
      geoCodingResult.name,
      weatherResult.weather[0].description,
    ].join(" ");
    emit("loading", true);
    let imageResult = await callCreateImageAPI(promt);
    emit("loading", false);
    if (imageResult !== undefined) {
      store.commit("changeImage", imageResult);
    }
    loading.value = false;
  }
}

async function callGeocodingAPI(city: string): Promise<LocationData> {
  let result = await getLocationByName(city, 1);
  if (Array.isArray(result)) {
    result = result[0];
  }
  if (result === undefined || result === null) {
    alert("Es wurde keine Stadt mit dem Namen " + city + " gefunden!");
  }
  return result;
}

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

async function callCreateImageAPI(promt: string): Promise<ImageData> {
  let result = await createImage(promt);
  if (Array.isArray(result)) {
    result = result[0];
  }
  if (result === undefined || result === null) {
    alert("Fehler bei der Erstellung des Bildes!");
  }
  return result;
}
</script>
