<script setup lang="ts">
import myAxios from '@/api/myAxios';
import { useRoute } from 'vue-router';
import { ref, watch, watchEffect } from 'vue';
import InputGroupComp from '@/components/inputGroup/InputGroupComp.vue';
import { Icon } from '@iconify/vue';
import { z } from 'zod';
import validator from 'validator';
import { useAuthStore } from '@/stores/auth';
import { AxiosError } from 'axios';


const route = useRoute();
const breeds = ref<BreedObj[]>([]);
const authStore = useAuthStore();
const mutated = ref<number>(0);

watch(() => ({ bType: route.params.breed, mutated }), async ({ bType }) => {
    try {
        const res = await myAxios.get(`/breed?type=${bType}`);
        console.log(res.data);
        breeds.value = res.data;
    } catch (error) {
        console.log(error);
    }
}, { immediate: true, deep: true });



const thClasses = "border-[1.5px] border-solid border-border font-semibold min-w-fit";

const sortById = ref<boolean>(true);

watchEffect(() => {
    if (sortById.value) {
        breeds.value.sort((a, b) => a.id - b.id);
        return;
    }
    breeds.value.sort((a, b) => {
        const val1 = a.name.trim().toLowerCase();
        const val2 = b.name.trim().toLowerCase();
        if (val1 > val2) {
            return 1;
        } else if (val1 < val2) {
            return -1;
        } else {
            return 0;
        }
    });
});

// Form Variables
const popupState = ref<boolean>(false);
const operationType = ref<"ADD" | "EDIT">("ADD");
const inputData = ref<{ name: string, type: string, slug: string }>({ name: '', type: route.params.breed as string, slug: "" });
const rootErr = ref<string>("");
const nameErr = ref<string[]>([]);

const nameParser = z.string().min(2, "should have atleast 2 characters").max(50, "should not exceed 50 characters").refine(val => validator.isAlphanumeric(val, "en-US", { ignore: " " }), "Should only contain alphanumeric characters and space.");

function closePopup() {
    popupState.value = false
    inputData.value.name = "";
    inputData.value.slug = "";
    rootErr.value = '';
    nameErr.value = [];
    operationType.value = "ADD";
}

async function submitHandler() {
    rootErr.value = "";
    nameErr.value = [];
    try {
        const parsedName = nameParser.safeParse(inputData.value.name);
        if (!parsedName.success) {
            nameErr.value = parsedName.error.issues.map(issue => issue.message)
            return;
        }
        if (operationType.value === "ADD") {
            await myAxios.post("/breed", { name: parsedName.data, type: inputData.value.type }, { headers: { Authorization: `Bearer ${authStore.accessToken}` } });
            mutated.value++;
            closePopup();
            return;
        }

        if (!inputData.value.slug.length) {
            return;
        }

        await myAxios.put(`/breed/${inputData.value.slug}`, { name: parsedName.data }, { headers: { Authorization: `Bearer ${authStore.accessToken}` } });
        mutated.value++;
        closePopup();
    } catch (error) {
        if (error instanceof AxiosError) {
            rootErr.value = error.response?.data?.message ?? "Operation failed";
            return;
        }
        rootErr.value = "Operation failed";
    }
}

function editActivator(name: string, slug: string) {
    popupState.value = true;
    inputData.value.name = name;
    inputData.value.slug = slug;
    operationType.value = "EDIT";
}

async function deleteFN(slug: string) {
    try {
        await myAxios.delete(`/breed/${slug}`, { headers: { Authorization: `Bearer ${authStore.accessToken}` } });
        mutated.value++;
    } catch (error) {
        console.log(error);
    }
}

</script>
<template>
    <div class="mx-myspace my-12">
        <h1 class="capitalize text-center text-3xl font-playfair font-semibold mb-5">Manage
            {{ (route.params.breed as string).toLowerCase() }} breeds
        </h1>
        <button
            class="mb-3 mx-auto block w-fit h-fit bg-primary px-8 py-1.5 rounded-md font-semibold duration-150 hover:bg-accent hover:text-terBg active:scale-90"
            @click="popupState = true">
            Add Breed
        </button>

        <table class="mx-auto">
            <tr class="bg-slate-600 text-terBg">
                <th :class="`${thClasses} w-[4ch] text-center cursor-pointer underline-offset-2 duration-150 hover:underline ${sortById ? 'underline' : ''}`"
                    @click="sortById = true">Id</th>
                <th :class="`${thClasses} w-[25ch] text-left px-2.5 py-2 cursor-pointer underline-offset-2 duration-150 hover:underline ${!sortById ? 'underline' : ''}`"
                    @click="sortById = false">Name</th>
                <th :class="thClasses + ' w-48'">Actions</th>
            </tr>
            <tr v-for="breed in breeds" :key="breed.id" class="border-b-2 border-b-border bg-secBg">
                <td class='text-center border-r-[1px] border-r-gray-500'>{{ breed.id }}</td>
                <td class="px-1.5 py-2 capitalize">{{ breed.name.toLowerCase() }}</td>
                <td class='flex items-center justify-center gap-x-5 p-2'>
                    <button
                        class="font-medium underline underline-offset-2 text-accent duration-150 hover:scale-110 active:scale-90"
                        @click="() => editActivator(breed.name, breed.slug)">Edit</button>
                    <button
                        class="font-medium underline underline-offset-2 text-red-600 duration-150 hover:scale-110 active:scale-90"
                        @click="() => deleteFN(breed.slug)">Delete</button>
                </td>
            </tr>
        </table>
    </div>

    <Teleport to="#portal1" v-if="popupState">
        <div class="fixed top-0 left-0 z-40 bg-black opacity-70 w-screen h-screen" />
        <form @submit.prevent="submitHandler"
            class="block fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-terBg border-[2px] w-screen h-fit max-w-96 min-w-fit mx-auto px-6 py-7 rounded-md">
            <h2 class="capitalize text-xl font-bold">
                {{ operationType.toLowerCase() }}
                {{ (route.params.breed as string).toLowerCase() }}
                Breed
            </h2>
            <div class="mb-5 text-red-600 font-medium text-sm">{{ rootErr }}</div>
            <InputGroupComp v-model:model-value="inputData.name" :error="nameErr" inp-id="breed-name" inp-type="text"
                inp-label="Breed Name" placeholder="Breed name here" />
            <button type="submit"
                class="block ml-auto w-fit h-fit rounded-lg mt-4 px-8 py-2 bg-primary font-medium duration-150 hover:bg-accent hover:text-terBg active:scale-110">Submit</button>
            <button type="button" class="absolute top-2 right-2 text-terFg duration-150 hover:text-red-600"
                @click="closePopup">
                <Icon icon="zondicons:close-solid" class="text-xl" />
            </button>
        </form>

    </Teleport>
</template>