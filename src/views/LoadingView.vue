<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const authStore = useAuthStore()

watch(authStore, () => {
    if (authStore.authValues.auth !== true) {
        router.replace(route.redirectedFrom || { name: "home" })
        return;
    }
})

</script>
<template>
    <h1 class="text-4xl text-center font-playfair font-medium m-myspace">Loading, Please wait...</h1>
</template>