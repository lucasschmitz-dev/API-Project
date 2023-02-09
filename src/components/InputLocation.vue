<template>
  <v-sheet width="300" class="mx-auto" style="background-color: transparent">
    <v-form @submit.prevent="submit">
      <v-text-field
        v-model="city"
        :rules="rules"
        label="Stadt"
        hint="Bitte Stadt mit vollem Namen eingeben"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2" style="color: #00bd7e"
        >Bestätigen</v-btn
      >
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import type { LocationData } from "@/model/Location.model";
import { getLocationByName } from "@/services/api/geocoding.service";
import { ref } from "vue";
import { useStore } from "vuex";

let store = useStore();

let city = ref("");
let rules = [
  (value: string) => {
    if (value) return true;
    return "Eingabe darf nicht leer sein!";
  },
];

async function submit(event: any) {
  const result = await event;
  if (result.valid === true) {
    let geoCodingResult = await callGeocodingAPI(city.value);
    if (geoCodingResult !== undefined) {
      store.commit("changeLocation", geoCodingResult);
    }
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
</script>
