<script setup lang="ts">

</script>
<template>
    <div class="mx-myspace my-12 flex gap-x-10">
        <div class="w-fit min-h-40 h-fit px-5 py-6 rounded-md bg-foreground flex flex-col gap-y-4">
            <RouterLink :to="{ name: 'user-dashboard' }" class="my-dash-link">Profile Details</RouterLink>
            <RouterLink :to="{ name: 'my-pets' }" class="my-dash-link">My Pets</RouterLink>
            <RouterLink class="my-dash-link" :to="{ name: 'rehome-a-pet' }">Rehome a Pet</RouterLink>
        </div>
        <div class="w-full">
            <router-view />
        </div>
    </div>
</template>
<style scoped>
.my-dash-link {
    @apply inline w-fit text-lg text-terBg font-medium duration-150 underline-offset-4 hover:underline;
}
</style>