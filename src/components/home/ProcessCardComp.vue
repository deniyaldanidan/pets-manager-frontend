<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
    iconVal: string,
    headText: string,
    paraText: string
}>()

</script>
<template>
    <div class="flex flex-col items-center gap-y-2.5 max-w-80">
        <Icon :icon="iconVal" class="text-secFg text-4xl" inline />
        <h3 class="text-xl text-center font-playfair font-semibold">{{ headText }}</h3>
        <div class="text-sm text-center">{{ paraText }}</div>
    </div>
</template>