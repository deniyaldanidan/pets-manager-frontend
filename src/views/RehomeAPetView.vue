<script setup lang="ts">
import myAxios from '@/api/myAxios';
import { initialPetData } from '@/assets/data/petInfos';
import RehomePetFormComp from '@/components/RehomePetForm/RehomePetFormComp.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter()

async function submitFN(data: any) {
    try {
        await myAxios.post("/rehome-a-pet", data, {
            headers: {
                Authorization: `Bearer ${authStore.accessToken}`
            }
        });
        router.push({ name: "home" });
    } catch (error) {
        throw new Error('Operation Failed');
    }
}



</script>
<template>
    <RehomePetFormComp :submit-fn="submitFN" :initial-inp="initialPetData" />
</template>