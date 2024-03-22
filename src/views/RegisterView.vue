<script setup lang="ts">
import myAxios from '@/api/myAxios';
import registerIllus from '@/assets/images/register.svg';
import InputGroupComp from '@/components/inputGroup/InputGroupComp.vue';
import { useAuthStore } from '@/stores/auth';
import { AxiosError } from 'axios';
import validator from 'validator';
import { ref } from 'vue';
import { z } from 'zod';

const { setAuth } = useAuthStore();

const name = ref("");
const username = ref("");
const email = ref("");
const password = ref("");

const errorInitial = {
    name: [],
    username: [],
    email: [],
    password: [],
    root: ""
}

const errors = ref<{
    name: string[],
    username: string[],
    email: string[],
    password: string[],
    root: string
}>(errorInitial)

const parser = z.object({
    name: z.string().min(2, "Should be atleast 2 chars").max(30, "should not exceed 30 chars").refine(val => validator.isAlphanumeric(val, "en-US", { ignore: " ." }), { message: "Only alphanumeric chars, .  and space is allowed" }),
    email: z.string().email(),
    username: z.string().min(2, "Should be atleast 2 chars").max(30, "should not exceed 30 chars").refine(val => validator.isAlphanumeric(val, "en-US", { ignore: "_-" }), { message: "Only alphanumeric chars, - and _ is allowed" }),
    password: z.string().min(8, "min length 8").max(30, "max length 30").refine(val => validator.isStrongPassword(val), { message: 'password is weak. need lowercase and uppercase letters, numbers and symbols' })
})

async function onSubmitHandler() {
    errors.value = { ...errorInitial }
    const parsedVals = parser.safeParse({
        name: name.value,
        email: email.value,
        username: username.value,
        password: password.value
    })

    if (!parsedVals.success) {
        const parsedErrors = parsedVals.error.format();
        const allowedKeys = parser.keyof().options

        allowedKeys.forEach(key => {
            if ((key in parsedErrors) && key in errors.value) {
                errors.value[key] = parsedErrors[key]?._errors || []
            }
        })
        return;
    }

    try {
        const res = await myAxios.post("/auth/register", parsedVals.data);
        // console.log(res.data)
        const accToken = res.data?.accessToken;
        if (typeof accToken !== "string") {
            errors.value.root = "Login Failed"
            return;
        }
        setAuth(accToken);
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error?.response?.status === 409) {
                errors.value.root = error.response?.data?.message || "User Registration Failed";
                return;
            }
        }
        errors.value.root = "User Registration Failed";
    }
}
</script>

<template>
    <div class="border-[2px] rounded-xl w-full max-w-4xl mx-auto overflow-hidden flex my-myspace">
        <img :src="registerIllus" alt="Register Illustration"
            class="w-[45%] min-h-full object-contain object-center bg-terBg" />
        <form @submit.prevent="onSubmitHandler" class="w-full py-myspace px-10 flex flex-col gap-y-6">
            <div class="flex flex-col gap-y-1.5 mb-1.5">
                <h1 class="text-center text-3xl font-playfair font-medium capitalize">Create New Account</h1>
                <p class="error-text text-center">{{ errors.root }}</p>
            </div>
            <InputGroupComp v-model="name" inp-id="register-name" inp-label="FullName"
                placeholder="Enter your name here" :error="errors.name" inp-type="text" />
            <InputGroupComp v-model="username" inp-id="register-username" inp-label="Username"
                placeholder="Username here" :error="errors.username" inp-type="text" />
            <InputGroupComp v-model="email" inp-id="register-email" inp-label="Email" placeholder="Email here"
                :error="errors.email" inp-type="email" />
            <InputGroupComp v-model="password" inp-id="register-password" inp-label="Password"
                placeholder="Enter your password here" :error="errors.password" inp-type="password" />
            <button type="submit" class="submit-BTN mt-3">Submit</button>
            <p class="text-center mt-6">
                Already registered? <RouterLink to="/login"
                    class="font-medium capitalize underline underline-offset-2 hover:text-accent">
                    Log In</RouterLink>
            </p>
        </form>
    </div>
</template>