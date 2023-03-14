<template>
  <v-card>
    <v-img
      v-bind:src="'data:image/jpeg;base64,' + image?.data[0].b64_json"
      class="align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      aspect-ratio="1"
      cover
    >
      <v-btn
        class="downloadIcon"
        size="small"
        color="surface-variant"
        variant="text"
        icon="mdi-tray-arrow-down "
      ></v-btn>
      <v-card-title class="text-white" v-text="'Berlin, DE'"></v-card-title>
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        size="x-small"
        color="surface-variant"
        variant="text"
        prepend-icon="mdi-thumb-up"
        >27</v-btn
      >

      <v-btn
        size="x-small"
        color="surface-variant"
        variant="text"
        icon="mdi-thumb-down"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
import type { ImageData } from "@/model/ImageB64.model";

let store = useStore();
let image = ref<ImageData>();

watchEffect(async () => {
  const data = store.getters.getImage;
  if (data.data !== undefined) {
    image.value = data;
  }
});
</script>

<style scoped>
.downloadIcon {
  float: right;
}
</style>
