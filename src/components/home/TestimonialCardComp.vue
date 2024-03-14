<script setup lang="ts">

defineProps<{
    testimonial: string,
    name: string,
    location: string
}>()

</script>
<template>
    <div class="flex flex-col gap-y-4 max-w-80">
        <p>{{ testimonial }}</p>
        <div class="flex flex-col font-playfair">
            <h4 class="font-medium">{{ name }}</h4>
            <h5>{{ location }}</h5>
        </div>
    </div>
</template>