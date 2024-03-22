<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';


const model = defineModel();
defineProps<{
    inpId: string,
    inpLabel: string,
    placeholder: string,
    inpType: InputTypeHTMLAttribute,
    error: string | string[]
}>();

</script>
<template>
    <div class="flex flex-col gap-y-1">
        <label :for="inpId" class="font-medium capitalize">{{ inpLabel }}</label>
        <input :type="inpType" :id="inpId" :placeholder="placeholder" v-model="model">
        <p class="error-text" v-if="typeof error === 'string'">{{ error }}</p>
        <ul v-else class="flex flex-col gap-y-0.5">
            <li v-for="err in error" :key="err" class="error-text list-disc list-inside">{{ err }}</li>
        </ul>
    </div>
</template>