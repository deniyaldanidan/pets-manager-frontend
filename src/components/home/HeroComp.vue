<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <section id="hero" class="p-myspace max-w-[1100px] mx-auto ">
        <div class="flex flex-col gap-y-7 mb-myspace">
            <h1 class="font-playfair font-semibold text-center text-4xl uppercase">Furry Companionship Starts Here</h1>
            <h3 class="font-playfair font-medium text-center text-2xl text-secFg"><span class="uppercase">Saratha
                    Pet Adoption Centre:</span> Where
                Love and
                Whiskers Meet – Adopt a Cat or Dog and Create Lifelong
                Memories
            </h3>
            <RouterLink to="/adopt-a-pet"
                class="mx-auto w-fit block px-8 py-2 text-lg font-semibold bg-primary rounded-md duration-150 hover:bg-foreground hover:text-background">
                Adopt a
                Pet
            </RouterLink>
        </div>
        <img srcset="/images/hero-640.jpg 640w,
             /images/hero-1280.jpg 1280w,
             /images/hero-1400.jpg 1920w" sizes="(max-width: 640px) 100vw, 
            (max-width: 1280px) 100vw, 
            100vw" alt="Responsive Image" class="rounded-lg object-cover">
    </section>
</template>