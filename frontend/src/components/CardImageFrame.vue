<template>
  <v-card class="cardFrame">
    <v-img
      v-bind:src="'data:image/jpeg;base64,' + weatherData?.imageData"
      class="align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      aspect-ratio="1"
      cover
      @Click="openDialog()"
    >
      <v-btn
        class="downloadIcon download"
        size="small"
        color="surface-variant"
        variant="text"
        icon="mdi-tray-arrow-down"
        @Click="download($event)"
        download
      ></v-btn>
      <v-card-title class="text-white">{{ weatherData?.city }}</v-card-title>
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        size="x-small"
        color="surface-variant"
        variant="text"
        prepend-icon="mdi-thumb-up"
        >{{ weatherData?.likes }}</v-btn
      >

      <v-btn
        size="x-small"
        color="surface-variant"
        variant="text"
        icon="mdi-thumb-down"
      ></v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="dialog" width="auto" transition="dialog-bottom-transition">
    <ImageDialog :weatherData="weatherData!"></ImageDialog>
  </v-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import type { ImageData } from "@/model/ImageB64.model";
import { getWeatherDataAtRank } from "@/services/api/weatherDataBackend.service";
import type { Weatherdata } from "@/model/Weatherdata.model";
import ImageDialog from "./ImageDialog.vue";
import { downloadImage } from "@/services/utils";

let store = useStore();
let image = ref<ImageData>();
let weatherData = ref<Weatherdata>();
let dialog = ref<boolean>(false);

const props = defineProps({
  rank: {
    type: Number,
    required: true,
  },
});

onMounted(() => {
  getWeatherData(props.rank);
});

watchEffect(async () => {
  const data = store.getters.getImage;
  if (data.data !== undefined) {
    image.value = data;
  }
});

async function getWeatherData(rank: number) {
  let result = await getWeatherDataAtRank(rank);
  if (Array.isArray(result)) {
    result = result[0];
  }
  weatherData.value = result;
}

function openDialog() {
  if (weatherData.value === undefined) {
    return;
  }
  dialog.value = true;
}

function download(e: any) {
  e.stopPropagation();
  if (weatherData.value === undefined) {
    return;
  }
  downloadImage(weatherData.value);
}
</script>

<style scoped>
.downloadIcon {
  float: right;
  z-index: 100 !important;
}
.cardFrame:hover {
  cursor: pointer;
  box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
}
</style>
