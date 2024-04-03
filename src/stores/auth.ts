import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { ref, watch } from 'vue'
import { z } from 'zod'
import validator from 'validator'

const accessPayloadParser = z.object({
  username: z
    .string()
    .min(2)
    .max(24)
    .refine((val) => validator.isAlphanumeric(val, 'en-US', { ignore: '-_' })),
  name: z
    .string()
    .min(2)
    .max(30)
    .refine((val) => validator.isAlphanumeric(val, 'en-US', { ignore: ' .' })),
  id: z.string(),
  role: z.enum(['USER', 'ADMIN'])
})

export const unAuthState = { auth: false as const }
const loadingState = { auth: 'loading' as const }

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref('')

  const authValues = ref<
    (z.infer<typeof accessPayloadParser> & { auth: true }) | { auth: false | 'loading' }
  >(loadingState)

  watch(
    accessToken,
    () => {
      try {
        if (!validator.isJWT(accessToken.value)) {
          authValues.value = { ...unAuthState }
          return
        }
        const parsedVals = accessPayloadParser.parse(jwtDecode(accessToken.value))
        authValues.value = { ...parsedVals, auth: true }
        return true
      } catch (error) {
        authValues.value = { ...unAuthState }
        return
      }
    },
    { immediate: false }
  )

  function setAuth(token: string) {
    if (validator.isJWT(token)) {
      accessToken.value = token
    }
  }

  function resetAuth() {
    accessToken.value = ''
  }

  return { accessToken, authValues, setAuth, resetAuth }
})
