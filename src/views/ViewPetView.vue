<script setup lang="ts">
import myAxios from '@/api/myAxios';
import { petObjParser, type PetObj } from '@/assets/data/petInfos';
import PetInfoDetailedComp from '@/components/PetInfoDetailedComp.vue';
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

const petData = ref<PetObj>();
const route = useRoute();
const petId = route.params.petId

onBeforeMount(async () => {
    try {
        const res = await myAxios.get(`/pet/view/${petId}`);
        const data = petObjParser.parse(res.data);
        petData.value = data;
    } catch (error) {
        console.log(error);

    }
})

</script>
<template>
    <section class="p-myspace max-w-[1150px] mx-auto">
        <PetInfoDetailedComp v-if="petData" :type="petData.type" :name="petData.name" :breed-name="petData.breed.name"
            :pet-gender="petData.gender" :pet-age="petData.age" :vaccinated="petData.vaccinated"
            :neutered="petData.neutered" :sprayed="petData.sprayed" :shots-upto-date="petData.shots_uptodate"
            :pet-info="petData.info" :pet-reason="petData.reason" :owner-name="petData.owner.name"
            :phone="petData.phone" :city="petData.city" :state="petData.state" :created-at="petData.created_at">
        </PetInfoDetailedComp>
        <div v-else class="text-3xl text-center font-semibold w-full">No Data available to show</div>
    </section>
</template>