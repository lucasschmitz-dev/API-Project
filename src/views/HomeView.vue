<template>
  <div class="home">
    <InputLocation></InputLocation>
    <InfoCard title="Informationen:"></InfoCard>
  </div>
</template>

<script setup lang="ts">
import InfoCard from "@/components/InfoCard.vue";
import InputLocation from "@/components/InputLocation.vue";
</script>

<style>
@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
    gap: 60px;
  }
}
</style>
