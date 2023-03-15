<template>
  <div class="home">
    <v-container fluid fill-height>
      <v-row dense>
        <v-col :cols="4">
          <CardImageFrame :rank="1"></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame :rank="2"></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame :rank="3"></CardImageFrame>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col :cols="4">
          <CardImageFrame :rank="4"></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame :rank="5"></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame :rank="6"></CardImageFrame>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col :cols="4">
          <CardImageFrame :rank="7"></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame :rank="8"></CardImageFrame>
        </v-col>
        <v-col :cols="4">
          <CardImageFrame :rank="9"></CardImageFrame>
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
