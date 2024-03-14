<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
    <section class="bg-terBg p-myspace">
        <h1 class="text-4xl text-center font-medium font-playfair">Rehome a Pet</h1>
        <h3 class="text-lg text-center max-w-3xl mx-auto mt-3 mb-10">Give your beloved pet the chance for
            a
            new
            beginning. Rehome them
            through
            Saratha Pet Adoption Centre and
            ensure they find a new loving forever home.</h3>
        <RouterLink to="/rehome-a-pet"
            class="block mx-auto w-fit h-fit px-9 py-2 bg-primary text-lg capitalize font-medium rounded-md duration-150 hover:bg-secondary hover:scale-105">
            Rehome
            A Pet</RouterLink>
    </section>
</template>