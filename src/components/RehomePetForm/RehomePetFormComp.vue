<script setup lang="ts">
import InputGroupComp from '@/components/inputGroup/InputGroupComp.vue';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import myAxios from '@/api/myAxios';
import { useAuthStore } from '@/stores/auth';
import { omittedParser, parser, partializedParser, petAgeList } from '@/assets/data/petInfos';
import { citiesData } from '@/assets/data/cities';
import { z } from 'zod';
import InpGrpShellComp from '@/components/inputGroup/InpGrpShellComp.vue';

const authData = useAuthStore();
const allBreedsData = ref<{ id: number, type: PetType, name: string, slug: string }[]>([]);

onBeforeMount(async () => {
    try {
        const breedData = await myAxios.get('/breed', { headers: { Authorization: `Bearer ${authData.accessToken}` } });
        allBreedsData.value = breedData.data;
    } catch (error) {
        console.log(error);
    }
})

const choiceClasses = (active: boolean, text?: true) => `border-[2px] border-solid border-border cursor-pointer py-2 px-9 rounded-lg ${text ? 'font-medium text-lg capitalize' : ''} ${active ? 'border-primary' : ''} hover:border-primary`;

const choiceGRPClasses = "flex gap-x-6 ml-1";

const props = defineProps<{ submitFn: (data: any) => Promise<void>, initialInp: z.infer<typeof partializedParser> }>()

const inpValues = ref<z.infer<typeof partializedParser>>(props.initialInp);

watch(() => props.initialInp, (newVal) => {
    inpValues.value = newVal;
})

const errorsInitial = {
    root: "",
    name: [],
    breed_id: [],
    reason: [],
    info: [],
    phone: [],
    state: [],
    city: []
}

const inpErrors = ref<{
    root: string,
    name: string[],
    breed_id: string[],
    reason: string[],
    info: string[],
    phone: string[],
    state: string[],
    city: string[]
}>(errorsInitial)

const breedOptions = computed<{ id: number, name: string }[]>(() => {
    return allBreedsData.value.filter(breed => breed.type === inpValues.value.type).map(breed => ({ id: breed.id, name: breed.name }))
});
const statesOptions = citiesData.map(stateObj => stateObj.stateName)

const citiesOptions = computed(() => {
    const foundState = citiesData.find(stateObj => stateObj.stateName === inpValues.value.state);

    if (foundState) {
        return foundState.cities;
    }
    return [];
});

watch(() => inpValues.value.type, (newVal, oldVal) => {
    if (newVal !== oldVal && inpValues.value.breed_id !== props.initialInp.breed_id) {
        inpValues.value.breed_id = undefined;
    }
}, { immediate: false });

async function submitHandler() {
    inpErrors.value = { ...errorsInitial };
    const parsedVals = parser.safeParse(inpValues.value);
    if (!parsedVals.success) {
        const parsedErrors = parsedVals.error.format();

        const allowedKeys = omittedParser.keyof().options;

        allowedKeys.forEach(key => {
            if ((key in parsedErrors) && (key in inpErrors.value)) {
                inpErrors.value[key] = parsedErrors[key]?._errors || []
            }
        })
        return;
    }
    try {
        await props.submitFn(parsedVals.data);
    } catch (error) {
        if (error instanceof Error) {
            inpErrors.value.root = error.message || "Operation Failed. Try again"
        }
    }
}

</script>

<template>

    <form class="max-w-[1050px] mx-auto px-myspace my-myspace flex flex-col gap-y-6" @submit.prevent="submitHandler">
        <h1 class="text-3xl text-center font-bold font-playfair">Rehome a Pet</h1>
        <p class="error-text text-center w-full mb-6">{{ inpErrors.root }}</p>
        <InputGroupComp inp-id="pet-name" inp-label="Pet Name" inp-type="text" v-model:model-value="inpValues.name"
            placeholder="Enter your pet's name" :error="inpErrors.name" />
        <div class="inp-grp">
            <div class="inp-grp-label">Pet Type</div>
            <div :class="choiceGRPClasses">
                <div :class="`${choiceClasses(inpValues.type === 'DOG')} text-7xl`" @click="inpValues.type = 'DOG'">
                    <Icon icon="openmoji:dog-face" />
                </div>
                <div :class="`${choiceClasses(inpValues.type === 'CAT')} text-7xl`" @click="inpValues.type = 'CAT'">
                    <Icon icon="noto-v1:cat-face" />
                </div>
            </div>
        </div>
        <InpGrpShellComp inp-id="pet-breed" inp-label="Pet's Breed" :error="inpErrors.breed_id">
            <select id="pet-breed" v-model="inpValues.breed_id">
                <option :value="breed.id" v-for="breed in breedOptions" :key="breed.id">
                    {{ breed.name.trim().toLowerCase() }}</option>
            </select>
        </InpGrpShellComp>

        <div class="inp-grp">
            <div class="inp-grp-label">Pet's Age</div>
            <div :class="choiceGRPClasses">
                <div v-for="petAge in petAgeList" :key="petAge" :class="choiceClasses(inpValues.age === petAge, true)"
                    @click="inpValues.age = petAge">
                    {{ petAge.toLowerCase() }}</div>
            </div>
        </div>
        <div class="inp-grp">
            <div class="inp-grp-label">Pet's Gender</div>
            <div :class="choiceGRPClasses">
                <div :class="choiceClasses(inpValues.gender === 'MALE', true)" @click="inpValues.gender = 'MALE'">Male
                </div>
                <div :class="choiceClasses(inpValues.gender === 'FEMALE', true)" @click="inpValues.gender = 'FEMALE'">
                    Female
                </div>
            </div>
        </div>
        <div class="inp-grp">
            <div class="inp-grp-label">Pet Vaccination Status</div>
            <div :class="choiceGRPClasses">
                <div :class="choiceClasses(inpValues.vaccinated === true, true)" @click="inpValues.vaccinated = true">
                    Yes, Pet is vaccinated</div>
                <div :class="choiceClasses(inpValues.vaccinated === false, true)" @click="inpValues.vaccinated = false">
                    No, Pet is not vaccinated</div>
            </div>
        </div>
        <div class="inp-grp">
            <div class="inp-grp-label">Is your pet neutered?</div>
            <div :class="choiceGRPClasses">
                <div :class="choiceClasses(inpValues.neutered === true, true)" @click="inpValues.neutered = true">Yes,
                    Pet is Neutered</div>
                <div :class="choiceClasses(inpValues.neutered === false, true)" @click="inpValues.neutered = false">No,
                    Pet is not Neutered</div>
            </div>
        </div>
        <div class="inp-grp">
            <div class="inp-grp-label">Is your pet sprayed?</div>
            <div :class="choiceGRPClasses">
                <div :class="choiceClasses(inpValues.sprayed === true, true)" @click="inpValues.sprayed = true">Yes, Pet
                    is sprayed</div>
                <div :class="choiceClasses(inpValues.sprayed === false, true)" @click="inpValues.sprayed = false">No,
                    Pet is not sprayed</div>
            </div>
        </div>
        <div class="inp-grp">
            <div class="inp-grp-label">Pets shots upto date?</div>
            <div :class="choiceGRPClasses">
                <div :class="choiceClasses(inpValues.shots_uptodate === true, true)"
                    @click="inpValues.shots_uptodate = true">Yes, they are upto date</div>
                <div :class="choiceClasses(inpValues.shots_uptodate === false, true)"
                    @click="inpValues.shots_uptodate = false">No, they are not upto date</div>
            </div>
        </div>
        <InpGrpShellComp inp-id="pet-info" inp-label="Additional Information" :error="inpErrors.info">
            <textarea id="pet-info" rows="6" v-model="inpValues.info"
                placeholder="Additional information about your pet"></textarea>
        </InpGrpShellComp>

        <InpGrpShellComp inp-id="pet-reason" inp-label="Reason:" :error="inpErrors.reason">

            <textarea id="pet-reason" rows="6" v-model="inpValues.reason"
                placeholder="Why you're opting to adopt your pet?"></textarea>
        </InpGrpShellComp>
        <InputGroupComp v-model:model-value="inpValues.phone" inp-id="phone-input" inp-label="Your Mobile no:"
            inp-type="text" placeholder="Enter your phone number" :error="inpErrors.phone" />
        <div class="flex flex-col gap-y-2">
            <div class="font-semibold text-lg capitalize">Pet's Location:</div>
            <div :class="choiceGRPClasses">
                <InpGrpShellComp inp-id="pet-location-city" inp-label="City" :error="inpErrors.city" class="w-full">
                    <select id="pet-location-city" v-model="inpValues.city">
                        <option value="" disabled selected>Select a city</option>
                        <template v-if="citiesOptions.length">
                            <option v-for="city in citiesOptions" :key="city" :value="city">{{ city }}</option>
                        </template>
                        <template v-else>
                            <option value="" disabled>Please choose a state first</option>
                        </template>
                    </select>
                </InpGrpShellComp>
                <InpGrpShellComp inp-id="pet-location-state" inp-label="State" :error="inpErrors.state" class="w-full">
                    <select id="pet-location-state" v-model="inpValues.state">
                        <option value="" disabled selected>Select a state</option>
                        <option v-for="state in statesOptions" :key="state" :value="state">{{ state }}</option>
                    </select>
                </InpGrpShellComp>
            </div>
        </div>
        <button class="submit-BTN mt-5">Submit</button>
    </form>

</template>