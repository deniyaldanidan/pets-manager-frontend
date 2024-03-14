<script setup lang="ts">
import ProcessCardComp from './ProcessCardComp.vue';

</script>

<template>
    <section id="process" class="flex flex-col gap-y-5 items-center px-myspace mb-myspace">
        <h1 class="text-4xl font-playfair font-semibold capitalize">From Search to Snuggles: A Seamless Adoption Journey
        </h1>
        <h3 class="text-xl text-center font-playfair font-medium max-w-5xl">
            Experience the joy of pet adoption as we guide you through a simple and heartwarming process, connecting you
            with your new furry family member.
        </h3>
        <div class="flex items-start gap-x-7 mt-4">
            <ProcessCardComp icon-val="bi:search-heart" head-text="Search for Your Perfect Companion"
                para-text="Navigate through our diverse collection of adorable pets, discovering the one destined to become your lifelong furry friend." />
            <ProcessCardComp icon-val="ic:outline-connect-without-contact" head-text="Connect with Pet Owners"
                para-text="Initiate contact with the pet's owner, forging a connection that transcends adoption. Exchange stories and set the foundation for a beautiful friendship." />
            <ProcessCardComp icon-val="game-icons:paw-heart" head-text="Embrace a Lifetime of Love"
                para-text="Embark on a heartwarming journey by meeting the pet's owner. Witness the magic unfold as you and your new companion share the first moments of a lifetime filled with love and joy." />
        </div>
    </section>
</template>