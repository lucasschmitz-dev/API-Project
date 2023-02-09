<template>
  <div class="home">
    <InputLocation></InputLocation>
  </div>
</template>

<script setup lang="ts">
import InputLocation from "@/components/InputLocation.vue";
</script>

<style>
@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
