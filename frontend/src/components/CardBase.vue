<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>{{ description }}</h3>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  msg: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
  white-space: nowrap;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1330px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
