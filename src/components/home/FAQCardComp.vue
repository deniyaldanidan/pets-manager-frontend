<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

defineProps<{
    question: string,
    answer: string
}>()

const active = ref(false);

</script>

<template>
    <div class="w-full">
        <h3 :class="`flex justify-between items-center px-6 py-4 bg-terBg cursor-pointer ${active ? 'rounded-ss-md rounded-se-md border-b-[1.5px] border-solid border-border' : 'rounded-md'}`"
            @click="active = !active">
            <span class="font-medium">{{ question }}</span>
            <Icon :icon="active ? 'typcn:minus' : 'typcn:plus'" class="text-secFg text-xl" inline />
        </h3>
        <Transition name="fade">
            <p v-if="active" class="px-6 py-5 bg-terBg text">{{ answer }}</p>
        </Transition>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>