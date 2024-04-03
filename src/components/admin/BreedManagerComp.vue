<script setup lang="ts">
import myAxios from '@/api/myAxios';
import { computed, onBeforeMount, ref } from 'vue';
import { RouterLink } from 'vue-router';

const boxClasses = 'px-5 py-4 w-full bg-terBg h-fit rounded-lg';
const boxHeadClasses = 'text-lg font-semibold capitalize';
const boxCountClasses = 'text-4xl font-semibold mt-1 mb-2';
const boxLinkClasses = 'block text-right text-base font-semibold capitalize underline underline-offset-2 duration-200 hover:text-accent hover:-translate-x-1';

const breeds = ref<BreedObj[]>([]);
const catBreeds = computed(() => {
    if (breeds.value.length) {
        return breeds.value.filter(br => br.type === "CAT")
    };
    return [];
});

const dogBreeds = computed(() => {
    if (breeds.value.length) {
        return breeds.value.filter(br => br.type === "DOG")
    };
    return [];
});


onBeforeMount(async () => {
    try {
        const res = await myAxios.get("/breed");
        // console.log(res.data);
        breeds.value = res.data;
    } catch (error) {
        console.log(error);
    }
})

</script>

<template>
    <h2 class="text-2xl text-left font-playfair font-semibold mb-4">Manage Breeds</h2>
    <div class="flex gap-7 justify-between">
        <div :class="boxClasses">
            <h4 :class="boxHeadClasses">Registered Dog Breeds</h4>
            <h3 :class="boxCountClasses">{{ dogBreeds.length }}</h3>
            <RouterLink :to="{ name: 'manage-breeds', params: { breed: 'DOG' } }" :class="boxLinkClasses">Manage
            </RouterLink>
        </div>
        <div :class="boxClasses">
            <h4 :class="boxHeadClasses">Registered Cat Breeds</h4>
            <h3 :class="boxCountClasses">{{ catBreeds.length }}</h3>
            <RouterLink :to="{ name: 'manage-breeds', params: { breed: 'CAT' } }" :class="boxLinkClasses">Manage
            </RouterLink>
        </div>
    </div>
</template>