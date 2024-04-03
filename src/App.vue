<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComp from './components/header/HeaderComp.vue';

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <HeaderComp />

    <main class="flex-grow">
      <RouterView />
    </main>

    <footer
      class="text-center text-sm bg-background text-secFg px-myspace pt-5 pb-3 border-t-2 border-solid border-border">
      &copy; 2024. Dani's Products. All rights reserved.
    </footer>
  </div>
</template>