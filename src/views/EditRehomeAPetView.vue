<script setup lang="ts">
import myAxios from '@/api/myAxios';
import { initialPetData, parser, partializedParser } from '@/assets/data/petInfos';
import RehomePetFormComp from '@/components/RehomePetForm/RehomePetFormComp.vue';
import { useAuthStore } from '@/stores/auth';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { z } from 'zod';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const initialData = ref<z.infer<typeof partializedParser>>(initialPetData);
const token = `Bearer ${authStore.accessToken}`;

onBeforeMount(async () => {
    try {
        const res = await myAxios.get<z.infer<typeof parser>>(`/pet-private-view/${route.params.petId}`, { headers: { Authorization: token } });
        const data = await parser.parseAsync(res.data);
        console.log(data);
        initialData.value = data;
    } catch (error) {
        console.log(error);

        router.push({ name: "home" })
    }
})

async function submitFN(data: z.infer<typeof parser>) {
    try {
        await myAxios.put(`/rehome-a-pet/${route.params.petId}`, data, {
            headers: {
                Authorization: token
            }
        });
        router.push({ name: "home" });
    } catch (error) {
        throw new Error('Operation Failed');
    }
}

</script>
<template>
    <RehomePetFormComp :submit-fn="submitFN" :initial-inp="initialData" />
</template>