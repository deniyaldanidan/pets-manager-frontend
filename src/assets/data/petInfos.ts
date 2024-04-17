import { z } from 'zod'
import validator from 'validator'

export const petAgeList = ['PUPPYHOOD', 'ADOLESCENCE', 'ADULTHOOD', 'SENIOR'] as const
export type PetAgeType = (typeof petAgeList)[number]

export const parser = z.object({
  name: z
    .string()
    .min(2)
    .max(30)
    .refine((val) => validator.isAlphanumeric(val, 'en-US', { ignore: ' .' }), 'Invalid name'),
  type: z.enum(['CAT', 'DOG']),
  age: z.enum(petAgeList),
  gender: z.enum(['MALE', 'FEMALE']),
  vaccinated: z.boolean(),
  neutered: z.boolean(),
  sprayed: z.boolean(),
  shots_uptodate: z.boolean(),
  reason: z.string().min(3).max(600),
  info: z.string().min(3).max(600),
  phone: z.string().refine((val) => validator.isMobilePhone(val, 'en-IN'), 'Invalid phone number'),
  breed_id: z.number().int(),
  state: z.string().min(1, 'must be filled'),
  city: z.string().min(1, 'must be filled')
})

export const partializedParser = parser.partial({ breed_id: true })

export const omittedParser = parser.omit({
  type: true,
  age: true,
  gender: true,
  vaccinated: true,
  neutered: true,
  shots_uptodate: true,
  sprayed: true
})

export const initialPetData: z.infer<typeof partializedParser> = {
  name: '',
  type: 'DOG',
  breed_id: undefined,
  age: 'PUPPYHOOD',
  gender: 'MALE',
  vaccinated: false,
  neutered: false,
  sprayed: false,
  shots_uptodate: false,
  reason: '',
  info: '',
  phone: '',
  state: '',
  city: ''
}

export const petObjParser = parser
  .extend({
    approved: z.boolean(),
    approved_at: z.string().datetime().nullable(),
    breed: z.object({
      name: z.string(),
      slug: z.string()
    }),
    created_at: z.string().datetime(),
    id: z.number().int(),
    owner: z.object({
      username: z.string(),
      name: z.string()
    })
  })
  .omit({ breed_id: true })

export type PetObj = z.infer<typeof petObjParser>

export const petObjListParser = z.array(petObjParser)
