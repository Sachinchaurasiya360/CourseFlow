import {z} from 'zod'

export const courseCreateValidation = z.object({
    slug:z.string(),
    courseName: z.string().min(2).max(40),
    courseDesciption: z.string().min(4).max(50),
    coursePrice: z.number(),
    category: z.string(),
    highlight: z.array(z.string())
})

export type  courseCreateValidationType= z.infer<typeof courseCreateValidation>