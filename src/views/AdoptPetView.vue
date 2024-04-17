<script setup lang="ts">
import myAxios from '@/api/myAxios';
import { petObjListParser, type PetObj } from '@/assets/data/petInfos';
import PetCardComp from '@/components/PetCardComp.vue';
import InpGrpShellComp from '@/components/inputGroup/InpGrpShellComp.vue';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { citiesData } from '@/assets/data/cities';

const statesList = citiesData.map(cdata => cdata.stateName);

const allPetsData = ref<PetObj[]>([]);
const resultedPetsData = ref<PetObj[]>([]);
const filterPetType = ref<'CAT' | 'DOG'>('DOG');
const filterPetState = ref<string>('');
const filterPetCity = ref<string>('');

onBeforeMount(async () => {
    try {
        const res = await myAxios.get("/");
        const data = petObjListParser.parse(res.data);
        allPetsData.value = data;
    } catch (error) {
        console.log(error);
    }
});

watch(allPetsData, () => {
    resultedPetsData.value = allPetsData.value.filter(petDat => petDat.type === filterPetType.value);
})

watch(filterPetState, () => {
    filterPetCity.value = ""
})

const citiesList = computed(() => {
    const foundState = citiesData.find(cDat => cDat.stateName === filterPetState.value);
    if (foundState) {
        return foundState.cities
    } else {
        return [];
    }
});

const onSubmit = () => {
    resultedPetsData.value = allPetsData.value.filter(petDat => {
        if (petDat.type === filterPetType.value) {
            if (filterPetState.value.length) {
                if (filterPetCity.value.length) {
                    return filterPetCity.value.toLowerCase() === petDat.city.toLowerCase();
                }
                return filterPetState.value.toLowerCase() === petDat.state.toLowerCase();
            }
            return true;
        }
        return false;
    })
}

const clearFilter = () => {
    filterPetCity.value = "";
    filterPetState.value = "";
    filterPetType.value = "DOG";
    resultedPetsData.value = allPetsData.value.filter(petDat => petDat.type === filterPetType.value);
}

</script>
<template>
    <div class="px-myspace py-myspace flex gap-x-6">
        <section class="min-w-72 bg-terBg w-fit h-fit rounded-lg">
            <form @submit.prevent="onSubmit" class="flex flex-col gap-y-6 px-4 py-6">
                <button type="button" @click="clearFilter"
                    class="self-start text-accent underline underline-offset-[3px] font-medium duration-150 hover:text-primary">Clear
                    All</button>
                <InpGrpShellComp inp-id="filter-pet-type" inp-label="Type" error="">
                    <select id="filter-pet-type" v-model="filterPetType">
                        <option value="DOG" selected>Dog</option>
                        <option value="CAT">Cat</option>
                    </select>
                </InpGrpShellComp>
                <InpGrpShellComp inp-id="filter-pet-state" inp-label="State" error="" v-model="filterPetState">
                    <select id="filter-pet-state" v-model="filterPetState">
                        <option value="" selected>Select one</option>
                        <option v-for="stateName in statesList" :key="stateName" :value="stateName">{{ stateName }}
                        </option>
                    </select>
                </InpGrpShellComp>
                <InpGrpShellComp inp-id="filter-pet-city" inp-label="City" error="">
                    <select id="filter-pet-city" v-model="filterPetCity">
                        <option value="" selected>Select one</option>
                        <template v-if="citiesList.length">
                            <option v-for="cityName in citiesList" :key="cityName" :value="cityName">{{ cityName }}
                            </option>
                        </template>
                        <option v-else disabled value="">Select a state first</option>
                    </select>
                </InpGrpShellComp>
                <button type="submit"
                    class="px-9 w-full py-2 bg-primary text-lg font-medium rounded-md duration-150 hover:bg-accent hover:text-terBg active:scale-90">Apply</button>
            </form>
        </section>
        <section v-if="resultedPetsData.length" class="grid grid-cols-4 justify-evenly gap-8">
            <PetCardComp v-for="pet in resultedPetsData" :key="pet.id" :pet-name="pet.name" :breed-name="pet.breed.name"
                :created-at="pet.created_at" :pet-age="pet.age" :pet-gender="pet.gender" :city="pet.city"
                :state="pet.state" :pet-owner="pet.owner.name" :pet-type="pet.type"
                :to="{ name: 'view-pet', params: { petId: pet.id } }" />
        </section>
        <h2 v-else class="text-3xl text-center font-semibold w-full">No Data available to show</h2>
    </div>
</template>