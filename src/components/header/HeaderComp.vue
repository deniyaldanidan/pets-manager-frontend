<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { watch } from 'vue';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();

const menuClasses = "text-lg capitalize duration-150 hover:underline hover:underline-offset-2";

watch(authStore, () => {
    console.log(authStore.authValues);
}, { immediate: true })

</script>

<template>
    <header class="flex justify-between items-center bg-secBg px-myspace py-4 border-b-2 border-solid border-border">
        <a href="/" class="text-2xl text-secFg font-playfair font-medium">S.P.A.C</a>

        <nav class="flex items-center gap-x-8">
            <RouterLink to="/" :class="menuClasses">Home</RouterLink>
            <RouterLink to="/about" :class="menuClasses">About</RouterLink>
            <template v-if="!authStore.authValues.auth">
                <RouterLink to="/login" :class="menuClasses">Login</RouterLink>
                <RouterLink to="/register" :class="menuClasses">Register</RouterLink>
            </template>
            <template v-else>
                <RouterLink to="/" :class="menuClasses">Hello, {{ authStore.authValues.name }}</RouterLink>
                <button :class="menuClasses" @click="authStore.resetAuth">Logout</button>
            </template>
            <RouterLink to="/adopt-a-pet"
                class="text-lg capitalize bg-primary px-8 py-1.5 font-medium rounded-lg duration-150 hover:bg-accent hover:text-background active:scale-90">
                Adopt A Pet
            </RouterLink>
        </nav>
    </header>
</template>