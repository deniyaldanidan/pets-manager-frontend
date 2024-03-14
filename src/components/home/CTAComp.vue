<script setup lang="ts">
import PetLove from '@/assets/images/love-pets.svg';
import { RouterLink } from 'vue-router';

</script>
<template>
    <section class="flex items-center justify-center gap-x-14 p-myspace bg-primary">
        <img :src="PetLove" alt="Adopt Pets" class="w-full max-w-[400px] h-auto">
        <div class="flex flex-col gap-y-4 max-w-xl">
            <h1 class="text-4xl font-playfair font-semibold">Ready to Make a Furry Addition to Your
                Family?</h1>
            <h3 class="text-xl text-justify font-medium">Take the first step towards a lifetime of love and
                companionship. Click the 'Adopt a Pet' button below
                and find your perfect furry companion today.
            </h3>
            <RouterLink to="/adopt-a-pet"
                class="w-fit h-fit text-lg self-center font-medium bg-foreground text-background px-10 py-2 rounded-lg duration-150 hover:bg-accent hover:text-background">
                Adopt a Pet</RouterLink>
        </div>
    </section>
</template>