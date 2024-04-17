<script setup lang="ts">
import myAxios from '@/api/myAxios';
import { petObjParser, type PetObj } from '@/assets/data/petInfos';
import PetInfoDetailedComp from '@/components/PetInfoDetailedComp.vue';
import { useAuthStore } from '@/stores/auth';
import { Icon } from '@iconify/vue';

import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const token = `Bearer ${authStore.accessToken}`;
const petId = route.params.petId;
const petData = ref<PetObj | null>(null);
const deletePopState = ref<boolean>(false);

onBeforeMount(async () => {
    try {
        const res = await myAxios.get(`/pet-private-view/${petId}`, { headers: { Authorization: token } });
        const data = await petObjParser.parseAsync(res.data);
        petData.value = data;
    } catch (error) {
        console.log(error);
    }
})

const deleteFN = async () => {
    try {
        await myAxios.delete(`/rehome-a-pet/${petId}`, { headers: { Authorization: token } });
        deletePopState.value = false;
        router.push({ name: 'my-pets' })
    } catch (error) {
        console.log(error);

    }
}

</script>
<template>
    <PetInfoDetailedComp v-if="petData !== null" :type="petData.type" :name="petData.name"
        :breed-name="petData.breed.name" :pet-gender="petData.gender" :pet-age="petData.age"
        :vaccinated="petData.vaccinated" :neutered="petData.neutered" :sprayed="petData.sprayed"
        :shots-upto-date="petData.shots_uptodate" :pet-info="petData.info" :pet-reason="petData.reason"
        :owner-name="petData.owner.name" :phone="petData.phone" :city="petData.city" :state="petData.state"
        :created-at="petData.created_at">
        <div class="py-5 flex gap-14 items-center">
            <div class="flex gap-x-3 items-center">
                <span class="capitalize text-lg font-medium">Approved</span>
                <span class="capitalize text-lg">{{ petData.approved }}</span>
            </div>
            <div v-if="petData.approved_at?.length" class="flex gap-x-3 items-center">
                <span class="capitalize text-lg font-medium">Approved On</span>
                <span
                    class="capitalize text-lg">{{ new Date(petData.approved_at).toLocaleString(undefined, { dateStyle: "long" }) }}</span>
            </div>
        </div>
        <!-- Action Buttons -->
        <div class="flex gap-x-14">
            <RouterLink :to="{ name: 'edit-pet-info', params: { petId: petData.id } }" class="action-btns bg-primary">
                Edit
            </RouterLink>
            <button class="action-btns bg-red-600 text-terBg" @click="deletePopState = true">Delete</button>
        </div>
        <Teleport to="#portal1">
            <div v-if="deletePopState"
                class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit min-w-72 border-2 border-border rounded-lg">
                <div class="w-full px-4 py-2 bg-red-600 text-terBg flex justify-between items-center rounded-t-md">
                    <span class="text-xl font-medium">Confirm Delete</span>
                    <Icon icon="line-md:close-circle" class="text-2xl cursor-pointer duration-150 hover:scale-110"
                        @click="deletePopState = false" />
                </div>
                <div class="min-h-40 px-4 py-4 text-lg bg-red-100">Are you sure you want to delete? This action is not
                    reversible.
                </div>
                <div
                    class="bg-red-100 py-3 px-4 rounded-b-md border-t-2 border-red-800 flex justify-end items-center gap-x-4">
                    <button class="action-btns bg-red-600 text-terBg" @click="deleteFN">Delete</button>
                    <button class="action-btns bg-secondary" @click="deletePopState = false">Cancel</button>
                </div>
            </div>
        </Teleport>
    </PetInfoDetailedComp>
    <div v-else class="flex flex-col items-center justify-center gap-y-3">
        <p class="text-xl font-medium">No Data to show</p>
        <RouterLink :to="{ name: 'home' }"
            class="underline underline-offset-2 font-medium capitalize text-lg hover:text-accent">
            Go
            Home
        </RouterLink>
    </div>
</template>

<style scoped>
.action-btns {
    @apply w-fit py-1.5 px-8 font-medium capitalize text-lg rounded-md duration-150 hover:bg-accent hover:text-terBg active:scale-95;
}
</style>
