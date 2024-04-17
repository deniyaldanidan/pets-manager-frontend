<script setup lang="ts">
import myAxios from '@/api/myAxios';
import { petObjListParser, type PetObj } from '@/assets/data/petInfos';
import { useAuthStore } from '@/stores/auth';
import { onBeforeMount, ref } from 'vue';
import PetCardComp from '@/components/PetCardComp.vue';

const authStore = useAuthStore();
const token = `Bearer ${authStore.accessToken}`;

const myPetsData = ref<PetObj[]>([]);

onBeforeMount(async () => {
    try {
        const res = await myAxios.get<PetObj[]>("/rehome-a-pet", { headers: { Authorization: token } });
        const data = await petObjListParser.parseAsync(res.data);
        myPetsData.value = data;
    } catch (error) {
        console.log(error);
        myPetsData.value = [];
    }
})

</script>
<template>
    <h1 class="w-full text-4xl text-center font-playfair font-semibold mb-10">My Pets</h1>
    <section v-if="myPetsData.length" class="flex flex-wrap gap-7">
        <PetCardComp v-for="myPet in myPetsData" :key="myPet.id" :pet-name="myPet.name" :pet-type="myPet.type"
            :pet-age="myPet.age" :pet-gender="myPet.gender" :pet-owner="myPet.owner.name" :breed-name="myPet.breed.name"
            :created-at="myPet.created_at" :city="myPet.city" :state="myPet.state"
            :to="{ name: 'view-my-pet', params: { petId: myPet.id } }" />
    </section>
    <h3 v-else class="text-xl text-center text-red-600 font-medium">No pets are listed for adoptation</h3>
</template>