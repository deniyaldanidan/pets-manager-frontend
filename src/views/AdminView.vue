<script setup lang="ts">
import BreedManagerComp from '@/components/admin/BreedManagerComp.vue';

</script>
<template>
    <div class="p-myspace">
        <!-- Head Text -->
        <h1 class="text-4xl text-center text-secFg font-playfair font-semibold capitalize">Admin Dashboard</h1>
        <!-- Breeds Management Section -->
        <div class="mt-8 mb-14">
            <BreedManagerComp />
        </div>
        <!-- Pets Management -->
        <div>
            <h3 class="text-3xl text-center font-playfair font-medium capitalize">--- Pets Section Comes Here ---</h3>
        </div>
    </div>
</template>