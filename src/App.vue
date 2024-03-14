<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';


let menuClasses = "text-lg capitalize duration-150 hover:underline hover:underline-offset-2";

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="flex justify-between items-center bg-secBg px-myspace py-4 border-b-2 border-solid border-border">
      <a href="/" class="text-2xl text-secFg font-playfair font-medium">S.P.A.C</a>

      <nav class="flex items-center gap-x-8">
        <RouterLink to="/" :class="menuClasses">Home</RouterLink>
        <RouterLink to="/about" :class="menuClasses">About</RouterLink>
        <RouterLink to="/login" :class="menuClasses">Login</RouterLink>
        <RouterLink to="/adopt-a-pet"
          class="text-lg capitalize bg-primary px-8 py-1.5 font-medium rounded-lg duration-150 hover:bg-accent hover:text-background active:scale-90">
          Adopt A Pet
        </RouterLink>
      </nav>
    </header>

    <main class="flex-grow">
      <RouterView />
    </main>

    <footer class="text-center text-sm bg-secBg text-secFg px-myspace pt-5 pb-3 border-t-2 border-solid border-border">
      &copy; 2024. Dani's Products. All rights reserved.
    </footer>
  </div>
</template>