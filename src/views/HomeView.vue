<template>
  <div class="home">
    <div class="informations">
      <InfoCard title="Informationen:"></InfoCard>
      <br />
      <InputLocation @loading="checkLoading"></InputLocation>
    </div>
    <div class="image">
      <img
        v-if="loadingState === false"
        class="content"
        v-bind:src="'data:image/jpeg;base64,' + image?.data[0].b64_json"
      />
      <v-progress-circular
        class="content"
        v-if="loadingState === true"
        indeterminate
        :size="128"
        :width="6"
      ></v-progress-circular>
      <div v-if="loadingState === undefined" class="content">
        Stadt eingeben, um ein Bild generieren zu lassen.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InfoCard from "@/components/InfoCard.vue";
import InputLocation from "@/components/InputLocation.vue";
import type { ImageData } from "@/model/ImageB64.model";
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";

let store = useStore();
let image = ref<ImageData>();
let loadingState = ref();

watchEffect(async () => {
  const data = store.getters.getImage;
  if (data.data !== undefined) {
    image.value = data;
  }
});

function checkLoading(e: boolean) {
  if (e) {
    loadingState.value = true;
  } else {
    loadingState.value = false;
  }
}
</script>

<style>
.image {
  height: 500px;
  width: 500px;
}

.content {
  height: 500px;
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  vertical-align: middle;
  line-height: 500px;
}

@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
    gap: 80px;
  }
}
</style>
