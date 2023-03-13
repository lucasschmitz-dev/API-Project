<template>
  <div class="home">
    <h1>404</h1>
    <div>Pfad wurde nicht gefunden!</div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.home {
  font-size: 30px;
}

@media (min-width: 1330px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
    gap: 80px;
  }

  .image {
    margin-top: 0;
  }
}
</style>
