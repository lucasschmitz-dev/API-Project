<template>
  <div class="home">
    <v-container fluid fill-height>
      <v-row dense>
        <v-col :cols="4">
          <CardImageFrame></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame></CardImageFrame>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col :cols="4">
          <CardImageFrame></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame></CardImageFrame>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col :cols="4">
          <CardImageFrame></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame></CardImageFrame>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import CardImageFrame from "@/components/CardImageFrame.vue";
</script>

<style scoped>
.home {
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-card {
  margin: 5px;
}

@media (min-width: 1330px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
    gap: 80px;
    width: 22em;
  }
}
</style>
