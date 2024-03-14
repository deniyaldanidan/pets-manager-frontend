<script setup lang="ts">
import { ref } from 'vue';
import FAQCardComp from './FAQCardComp.vue';
import faqsData from '@/assets/data/faqs';

const faqs = ref(faqsData);

</script>
<template>
    <section class="p-myspace">
        <h1 class="text-4xl text-center font-playfair font-medium">Frequently Asked Questions</h1>
        <div class="flex flex-col items-start gap-y-8 mt-10 max-w-5xl mx-auto">
            <FAQCardComp v-for="faq in faqs" :key="faq.id" v-bind="faq" />
        </div>
    </section>
</template>