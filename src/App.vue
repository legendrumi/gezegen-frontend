<script setup>
import Navbar from './components/layouts/Navbar.vue';
// import HomePage from './views/HomePage.vue';
</script>

<template>
  <div class="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <!-- <HomePage /> -->
      <RouterView />
  </div>
</template>

<style scoped></style>
