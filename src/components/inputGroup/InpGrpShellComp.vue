<script setup lang="ts">
defineProps<{
    inpId: string,
    inpLabel: string,
    error: string | string[]
}>()

</script>
<template>
    <div class="inp-grp">
        <label :for="inpId" class="inp-grp-label">{{ inpLabel }}</label>
        <slot></slot>
        <p class="error-text" v-if="typeof error === 'string'">{{ error }}</p>
        <ul v-else class="flex flex-col gap-y-0.5">
            <li v-for="err in error" :key="err" class="error-text list-disc list-inside">{{ err }}</li>
        </ul>
    </div>
</template>