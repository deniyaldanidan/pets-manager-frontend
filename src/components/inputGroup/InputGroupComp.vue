<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';
import InpGrpShellComp from './InpGrpShellComp.vue';


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
    <InpGrpShellComp :inp-id="inpId" :inp-label="inpLabel" :error="error">
        <input :type="inpType" :id="inpId" :placeholder="placeholder" v-model="model">
    </InpGrpShellComp>

</template>