<script setup lang="ts">
import TestimonialCardComp from './TestimonialCardComp.vue';
</script>
<template>
    <section class="bg-terBg p-myspace flex flex-col gap-y-3 items-center">
        <h1 class="text-center text-4xl font-playfair font-semibold">Hear from our happy adopters</h1>
        <h3 class="text-center text-lg font-playfair font-medium">Discover heartwarming stories from pet lovers who
            found their
            perfect companions
            through Saratha Pet
            Adoption Centre.
        </h3>
        <div class="mt-7 flex items-start gap-x-16">
            <TestimonialCardComp
                testimonial="Adopting from Saratha Pet Adoption Centre was a life-changing experience for me. My furry friend has brought so much joy and love into my life. I'm forever grateful."
                name="Priya Sharma" location="Mumbai, India" />
            <TestimonialCardComp
                testimonial="I couldn't be happier with the adoption process at Saratha Pet Adoption Centre. They made it easy to find my perfect companion, and now my home is filled with laughter and wagging tails."
                name="Rohan Patel" location="Bangalore, India" />
            <TestimonialCardComp
                testimonial="Saratha Pet Adoption Centre made my dream of having a furry friend come true. The staff were incredibly supportive throughout the process, and now I have a loyal companion by my side."
                name="Nisha Gupta" location="Delhi, India" />
        </div>
    </section>
</template>