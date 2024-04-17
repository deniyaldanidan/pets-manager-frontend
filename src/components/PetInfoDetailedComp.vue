<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
    type: "DOG" | "CAT",
    name: string,
    breedName: string,
    petGender: string,
    petAge: string,
    vaccinated: boolean,
    neutered: boolean,
    sprayed: boolean,
    shotsUptoDate: boolean,
    petInfo: string,
    petReason: string,
    ownerName: string,
    phone: string,
    city: string,
    state: string,
    createdAt: string
}>()

</script>

<template>
    <div class="mx-auto w-fit font-medium text-sm mb-1 bg-slate-300 px-3 py-1 rounded">Posted on:
        {{ new Date(createdAt).toLocaleString(undefined, { dateStyle: "long" }) }}
    </div>
    <Icon :icon="type === 'DOG' ? 'openmoji:dog-face' : 'openmoji:cat-face'"
        class="block text-[9rem] text-center w-full" />
    <h2 class="-mt-1 text-center text-xl font-medium capitalize">
        {{ name.toLowerCase() }}
    </h2>
    <h3 class="-mt-1 text-center text-lg text-terFg font-medium capitalize">
        {{ breedName.toLowerCase() }}
    </h3>
    <!-- Pet Information -->
    <section class="mt-9 pb-5 border-b border-solid border-b-border">
        <h2 class="section-head">Pet Information:</h2>
        <div class="mt-3 grid gap-3.5 grid-cols-3">
            <!-- Gender -->
            <div class="pet-info-box">
                <div>Gender: </div>
                <div>{{ petGender.toLowerCase() }}</div>
            </div>
            <!-- AGE -->
            <div class="pet-info-box">
                <div>Age: </div>
                <div>{{ petAge.toLowerCase() }}</div>
            </div>
            <!-- VACCINATED -->
            <div class="pet-info-box">
                <div>Vaccinated: </div>
                <div>{{ vaccinated }}</div>
            </div>
            <!-- NEUTERED -->
            <div class="pet-info-box">
                <div>Neutered: </div>
                <div>{{ neutered }}</div>
            </div>
            <!-- SPRAYED -->
            <div class="pet-info-box">
                <div>Sprayed: </div>
                <div>{{ sprayed }}</div>
            </div>
            <!-- Shot_uptodate -->
            <div class="pet-info-box">
                <div>Shots Up To Date</div>
                <div>{{ shotsUptoDate }}</div>
            </div>

        </div>
    </section>
    <!-- Additional Info -->
    <div class="border-b border-solid border-b-border py-5">
        <h3 class="section-head">Additional Info:</h3>
        <p class="text-lg mt-2">{{ petInfo }}</p>
    </div>
    <!-- REASON -->
    <div class="border-b border-solid border-b-border py-5">
        <h3 class="section-head">Reason: </h3>
        <p class="text-lg mt-2">{{ petReason }}</p>
    </div>
    <!-- Contact Info & Owner Name & Location (City, State) -->
    <div class="border-b border-solid border-b-border py-5">
        <div class="section-head">Contact Info</div>
        <div class="grid grid-cols-2 gap-3 mt-3">
            <div class="pet-info-box">
                <div>Owner Name:</div>
                <div>{{ ownerName.toLowerCase() }}</div>
            </div>
            <div class="pet-info-box">
                <div>Phone no:</div>
                <div>{{ phone }}</div>
            </div>
            <div class="pet-info-box">
                <div>Location:</div>
                <div>{{ city.toLowerCase() }}, {{ state.toLowerCase() }}.</div>
            </div>
        </div>
    </div>
    <!-- Leave a slot here -->
    <slot></slot>
</template>
<style scoped>
.section-head {
    @apply font-semibold font-playfair text-2xl capitalize;
}

.pet-info-box {
    @apply flex gap-x-3 items-center;
}

.pet-info-box>div {
    @apply capitalize text-lg;
}

.pet-info-box>div:first-child {
    @apply font-medium;
}
</style>