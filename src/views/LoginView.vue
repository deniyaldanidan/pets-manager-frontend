<script setup lang="ts">
import loginIllus from '@/assets/images/login.svg';
import InputGroupComp from '@/components/inputGroup/InputGroupComp.vue';
import { ref } from 'vue';
import validator from 'validator';
import { z } from 'zod';
import myAxios from '@/api/myAxios';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';


const router = useRouter()
const { setAuth } = useAuthStore();

const usernameOrEmail = ref("");
const password = ref("");
const errorInitial = {
    root: "",
    usernameOrEmail: [],
    password: []
}
const errors = ref<{
    root: string,
    usernameOrEmail: string[],
    password: string[]
}>(errorInitial)

const parser = z.object({
    usernameOrEmail: z.string().min(2, "should contain atleast 2 chars").max(24, "exceeded max limit of 24 chars").refine(val => validator.isAlphanumeric(val, 'en-US', { ignore: "_-" }), { message: "Invalid username value" }).or(z.string().email()),
    password: z.string().max(30, "exceeded max limit of 30 chars").min(1, "should contain atleast 1 char")
});

async function onSubmitHandler() {
    errors.value = { ...errorInitial };
    const parsedVals = parser.safeParse({ usernameOrEmail: usernameOrEmail.value, password: password.value });
    if (!parsedVals.success) {
        const parsedErrors = parsedVals.error.format();
        const allowedKeys = parser.keyof().options;
        allowedKeys.forEach(key => {
            if ((key in parsedErrors) && key in errors.value) {
                errors.value[key] = parsedErrors[key]?._errors || []
            }
        })
        return;
    }
    try {
        const res = await myAxios.post("/auth/login", parsedVals.data);
        const accToken = res.data?.accessToken;
        if (typeof accToken !== "string") {
            errors.value.root = "Login Failed"
            return;
        }
        setAuth(accToken);
        router.push({ name: 'home' });
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error?.response?.status === 409) {
                errors.value.root = error?.response?.data?.message || "Login Failed";
                return;
            }
        }
        errors.value.root = "Login Failed";
    }
}
</script>

<template>
    <div class="border-[2px] rounded-xl w-full max-w-4xl mx-auto overflow-hidden flex my-10">

        <form @submit.prevent="onSubmitHandler" class="w-full py-myspace px-10 flex flex-col gap-y-6 bg-terBg">
            <div class="flex flex-col gap-y-1.5 mb-1.5">
                <h1 class="text-center text-3xl font-playfair font-medium capitalize">Welcome back</h1>
                <p class="error-text text-center">{{ errors.root }}</p>
            </div>
            <InputGroupComp v-model="usernameOrEmail" inp-id="login-username-or-email" inp-label="Username or Email"
                placeholder="You're Username or Email" :error="errors.usernameOrEmail" inp-type="text" />
            <InputGroupComp v-model="password" inp-id="login-password" inp-label="Password"
                placeholder="Enter your password here" :error="errors.password" inp-type="password" />
            <button type="submit" class="submit-BTN mt-3">Login</button>
            <p class="text-center mt-6">
                Don't have an account yet? <RouterLink to="/register"
                    class="font-medium capitalize underline underline-offset-2 hover:text-accent">
                    Register here</RouterLink>
            </p>
        </form>
        <img :src="loginIllus" alt="Login Illustration"
            class="w-[45%] min-h-full object-contain object-center bg-secBg" />
    </div>
</template>