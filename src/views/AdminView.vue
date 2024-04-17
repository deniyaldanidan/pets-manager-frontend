<script setup lang="ts">
import myAxios from '@/api/myAxios';
import { petObjListParser, type PetObj } from '@/assets/data/petInfos';
import BreedManagerComp from '@/components/admin/BreedManagerComp.vue';
import { useAuthStore } from '@/stores/auth';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const petsList = ref<PetObj[]>([]);
const authStore = useAuthStore();
const token = `Bearer ${authStore.accessToken}`;
const pageNo = ref<number>(1);
const isNextPage = ref<boolean>(true);

watch(pageNo, async () => {
    try {
        const res = await myAxios.get(`/pets-management?pageNo=${pageNo.value}`, { headers: { Authorization: token } });
        const data = await petObjListParser.parseAsync(res.data);
        isNextPage.value = data.length >= 10
        petsList.value = data;
    } catch (error) {
        console.log(error);
        isNextPage.value = false
    }
}, { immediate: true })

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
            <h1 class="text-2xl text-left font-playfair font-semibold mb-4">Pets Management</h1>
            <template v-if="petsList.length">
                <table class="w-full border border-slate-700 border-collapse">
                    <tr class="bg-slate-700 text-terBg">
                        <th class="my-pet-admin-th text-left min-w-[2ch]">Id
                        </th>
                        <th class="my-pet-admin-th text-left min-w-[10ch]">
                            Owner Name</th>
                        <th class="my-pet-admin-th text-center min-w-[10ch]">Posted On</th>
                        <th class="my-pet-admin-th text-center min-w-[3ch]">Type</th>
                        <th class="my-pet-admin-th text-left">Breed</th>
                        <th class="my-pet-admin-th text-left">Location</th>
                        <th class="my-pet-admin-th min-w-[5ch] text-center">Approved</th>
                        <th class="my-pet-admin-th min-w-[10ch] text-right">Approved On</th>
                    </tr>
                    <tr v-for="pet in petsList" :key="pet.id"
                        class="border-b border-slate-700 cursor-pointer duration-150 hover:bg-slate-300"
                        @click="() => router.push({ name: 'admin-pet-view', params: { petId: pet.id } })">
                        <td class="my-pet-admin-td">{{ pet.id }}</td>
                        <td class="my-pet-admin-td">{{ pet.owner.name }}</td>
                        <td class="my-pet-admin-td text-center">
                            {{ new Date(pet.created_at).toLocaleString(undefined, { dateStyle: 'medium' }) }}</td>
                        <td class="my-pet-admin-td text-center">{{ pet.type }}</td>
                        <td class="my-pet-admin-td">{{ pet.breed.name }}</td>
                        <td class="my-pet-admin-td">{{ pet.city.toLowerCase() }}, {{ pet.state.toLowerCase() }}</td>
                        <td class="my-pet-admin-td text-center capitalize">{{ pet.approved }}</td>
                        <td class="my-pet-admin-td text-right">
                            {{ pet.approved_at?.length ? new Date(pet.approved_at).toLocaleString(undefined, { dateStyle: 'medium' }) : '-' }}
                        </td>
                    </tr>
                </table>
            </template>
            <div class="flex justify-end items-center gap-x-8 mt-4">
                <button type="button" @click="pageNo -= 1" v-if="pageNo > 1"
                    class="px-9 py-1.5 rounded-lg bg-primary font-medium duration-200 hover:text-terBg hover:bg-accent active:scale-95">Previous</button>
                <span class="text-lg font-medium capitalize">Page: {{ pageNo }}</span>
                <button type="button" v-if="isNextPage" @click="pageNo += 1"
                    class="px-9 py-1.5 rounded-lg bg-primary font-medium duration-200 hover:text-terBg hover:bg-accent active:scale-95">Next</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.my-pet-admin-th {
    @apply font-medium w-fit px-2.5 py-1.5 border-r border-slate-500;
}

.my-pet-admin-th:last-child {
    @apply border-none;
}

.my-pet-admin-td {
    @apply px-2.5 py-1.5 border-r border-slate-700;
}
</style>