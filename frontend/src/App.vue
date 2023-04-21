<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <CardBase
        msg="API Tool"
        description="zur Wetterdarstelllung mittels KI"
      />

      <nav>
        <RouterLink to="/">Startseite</RouterLink>
        <RouterLink to="/data">Daten</RouterLink>
        <a href="https://github.com/lucasschmitz-dev/API-Project">GitHub</a>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import CardBase from "./components/CardBase.vue";
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
}

nav a.router-link-exact-active {
  color: hsla(160, 100%, 37%, 1);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  color: var(--color-text);
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1330px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 3);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
