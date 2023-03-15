<template>
  <v-card class="cardFrame" :class="{ removeHover: weatherData === undefined }">
    <v-img
      v-if="loadingState === false || loadingState === undefined"
      v-bind:src="'data:image/jpeg;base64,' + weatherData?.imageData"
      class="align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      aspect-ratio="1"
      cover
      @Click="openDialog()"
    >
      <v-btn
        v-if="weatherData !== undefined"
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

    <v-img
      v-if="loadingState === true"
      v-bind:src="'data:image/jpeg;base64,'"
      class="align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      aspect-ratio="1"
      cover
      @Click="openDialog()"
    >
      <v-progress-circular
        class="loadingAnimation"
        indeterminate
      ></v-progress-circular>
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        v-if="isImageLiked === false && weatherData !== undefined"
        size="small"
        color="surface-variant"
        variant="text"
        prepend-icon="mdi-thumb-up"
        @Click="like()"
        >{{ weatherData?.likes }}</v-btn
      >
      <v-btn
        v-if="isImageLiked === true && weatherData !== undefined"
        size="small"
        color="green"
        variant="text"
        prepend-icon="mdi-thumb-up"
        @Click="removelike()"
        >{{ weatherData?.likes }}</v-btn
      >
      <v-btn
        v-if="isImageDisliked === false && weatherData !== undefined"
        size="x-small"
        color="surface-variant"
        variant="text"
        icon="mdi-thumb-down"
        @Click="dislike()"
      ></v-btn>
      <v-btn
        v-if="isImageDisliked === true && weatherData !== undefined"
        size="x-small"
        color="red"
        variant="text"
        icon="mdi-thumb-down"
        @Click="removedislike()"
      ></v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="dialog" width="auto" transition="dialog-bottom-transition">
    <ImageDialog :weatherData="weatherData!"></ImageDialog>
  </v-dialog>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import type { ImageData } from "@/model/ImageB64.model";
import {
  dislikeImage,
  getWeatherDataWithId,
  likeImage,
  removedislikeImage,
  removelikeImage,
} from "@/services/api/weatherDataBackend.service";
import type { Weatherdata } from "@/model/Weatherdata.model";
import ImageDialog from "./ImageDialog.vue";
import { downloadImage } from "@/services/utils";
import { watch } from "vue";

let store = useStore();
let image = ref<ImageData>();
let weatherData = ref<Weatherdata>();
let dialog = ref<boolean>(false);
let isImageLiked = ref<boolean>(false);
let isImageDisliked = ref<boolean>(false);
let loadingState = ref<boolean>(true);

const props = defineProps({
  id: {
    type: Number,
    required: false,
  },
});

onBeforeMount(() => {
  const data = store.getters.getImage;
  checkLiked(data);
});

onBeforeMount(() => {
  const data = store.getters.getImage;
  checkDisliked(data);
});

onMounted(() => {
  if (props.id !== undefined) {
    getWeatherData(props.id);
  }
});

watch(
  () => props.id,
  () => {
    if (props.id !== undefined) {
      loadingState.value = true;
      getWeatherData(props.id);
    } else {
      weatherData.value = undefined;
    }
  }
);

watchEffect(async () => {
  const data = store.getters.getImage;
  if (data.data !== undefined) {
    image.value = data;
  }
});

watchEffect(async () => {
  const data = store.getters.getLikedImages;
  checkLiked(data);
});

watchEffect(async () => {
  const data = store.getters.getDislikedImages;
  checkDisliked(data);
});

function checkLiked(data: any) {
  if (weatherData.value?.id === undefined) {
    return;
  }
  if (data.includes(weatherData.value.id)) {
    if (
      weatherData.value.likes === undefined ||
      weatherData.value.likes === null
    ) {
      alert("Likes are undefined!");
      return;
    }
    isImageLiked.value = true;
  } else {
    isImageLiked.value = false;
  }
}

function checkDisliked(data: any) {
  if (weatherData.value?.id === undefined) {
    return;
  }
  if (data.includes(weatherData.value.id)) {
    if (
      weatherData.value.likes === undefined ||
      weatherData.value.likes === null
    ) {
      alert("Likes are undefined!");
      return;
    }
    isImageDisliked.value = true;
  } else {
    isImageDisliked.value = false;
  }
}

async function getWeatherData(rank: number) {
  if (props.id === undefined) {
    return;
  }
  let result = await getWeatherDataWithId(rank);
  if (Array.isArray(result)) {
    result = result[0];
  }
  weatherData.value = result;
  if (
    weatherData.value.likes === undefined ||
    weatherData.value.likes === null
  ) {
    weatherData.value.likes = 0;
  }
  if (
    weatherData.value.dislikes === undefined ||
    weatherData.value.dislikes === null
  ) {
    weatherData.value.dislikes = 0;
  }
  loadingState.value = false;
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

async function like() {
  if (weatherData.value === undefined) {
    return;
  }
  if (weatherData.value.id === undefined) {
    alert("Fehler bei der ID!");
    return;
  }
  let result = await likeImage(weatherData.value.id);
  if (result) {
    store.state.likedImages.push(weatherData.value.id);
    weatherData.value.likes!++;
  }
}

async function removelike() {
  if (weatherData.value === undefined) {
    return;
  }
  if (weatherData.value.id === undefined) {
    alert("Fehler bei der ID!");
    return;
  }
  let result = await removelikeImage(weatherData.value.id);
  if (result) {
    const index = store.state.likedImages.indexOf(weatherData.value.id);
    store.state.likedImages.splice(index, 1);
    weatherData.value.likes!--;
  }
}

async function dislike() {
  if (weatherData.value === undefined) {
    return;
  }
  if (weatherData.value.id === undefined) {
    alert("Fehler bei der ID!");
    return;
  }
  let result = await dislikeImage(weatherData.value.id);
  if (result) {
    store.state.dislikedImages.push(weatherData.value.id);
    weatherData.value.dislikes!++;
  }
}

async function removedislike() {
  if (weatherData.value === undefined) {
    return;
  }
  if (weatherData.value.id === undefined) {
    alert("Fehler bei der ID!");
    return;
  }
  let result = await removedislikeImage(weatherData.value.id);
  if (result) {
    const index = store.state.dislikedImages.indexOf(weatherData.value.id);
    store.state.dislikedImages.splice(index, 1);
    weatherData.value.dislikes!--;
  }
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

.removeHover {
  pointer-events: none !important;
}

.loadingAnimation {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

:deep .v-responsive__content {
  position: static !important;
}
</style>
