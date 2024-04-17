<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { type PetAgeType } from '../assets/data/petInfos';
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
    petType: "DOG" | "CAT",
    petName: string,
    breedName: string,
    petGender: "MALE" | "FEMALE",
    petAge: PetAgeType,
    petOwner: string,
    city: string,
    state: string,
    createdAt: string,
    to: RouteLocationRaw
}>();
</script>

<template>
    <div class="relative shadow bg-terBg rounded-md min-w-64 w-fit px-5 py-4">
        <Icon :icon="petType === 'DOG' ? 'openmoji:dog-face' : 'openmoji:cat-face'"
            class="block text-[12rem] text-center w-full" />
        <div class="flex flex-col mt-2.5 gap-y-2">
            <div>
                <div class="capitalize font-semibold text-lg">{{ petName.toLowerCase() }}</div>
                <div class="capitalize -mt-0.5 font-medium text-secFg">{{ breedName.toLowerCase() }}</div>
            </div>
            <div class="capitalize">{{ petGender.toLowerCase() }}, {{ petAge.toLowerCase() }}</div>
            <div class="capitalize"><strong class="font-semibold mr-1">Owner: </strong> {{ petOwner.toLowerCase() }}
            </div>
            <div class="capitalize flex items-center gap-x-1.5">
                <Icon icon="line-md:my-location" class="font-medium text-lg" />{{ city.toLowerCase() }},
                {{ state.toLowerCase() }}
            </div>
            <RouterLink :to="to"
                class="w-fit mx-auto flex items-center justify-center gap-x-2 font-medium mt-1.5 duration-150 hover:text-primary">
                View More
                <Icon icon="line-md:external-link" class="text-lg font-medium" />
            </RouterLink>
        </div>
        <div class="absolute top-0.5 right-0.5 text-sm font-medium px-1.5 py-1 bg-slate-100 rounded-sm">Posted on:
            {{ new Date(createdAt).toLocaleString(undefined, { dateStyle: "long" }) }}</div>
    </div>
</template>