import {z} from 'zod'

export const courseCreateValidation = z.object({
    courseName: z.string().min(2).max(40),
    courseDescription: z.string().min(4).max(500),
    coursePrice: z.number(),
    category: z.string(),
    highlights: z.array(z.string())
})
export const moduleCreateValidation= z.object({
    title:z.string().min(2).max(50),
    coursesId:z.string()
})
export const CourseContentvalidation = z.object({
    title:z.string(),
    description:z.string(),
    type:z.enum(["VIDEO","TEXT"]),
    notes:z.string().optional()


})
export type moduleCreateTypes= z.infer<typeof moduleCreateValidation>
export type courseCreateType= z.infer<typeof courseCreateValidation>
export type courseContentTypes=z.infer<typeof CourseContentvalidation>