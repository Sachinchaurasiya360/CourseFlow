import {z} from 'zod'

export const courseCreateValidation = z.object({
    slug:z.string(),
    courseName: z.string().min(2).max(40),
    courseDesciption: z.string().min(4).max(50),
    coursePrice: z.number(),
    category: z.string(),
    highlight: z.array(z.string())
})
export const moduleCreateValidation= z.object({
    moduleTitle:z.string().min(2).max(50),
    coursesId:z.string()
})
export const CourseContentvalidation = z.object({
    title:z.string(),
    description:z.string(),
    type:z.enum(["VIDEO","TEXT"]),
    notes:z.string()


})
export type moduleCreateTypes= z.infer<typeof moduleCreateValidation>
export type courseCreateType= z.infer<typeof courseCreateValidation>
export type courseContentTypes=z.infer<typeof CourseContentvalidation>