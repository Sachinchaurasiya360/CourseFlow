import { z } from "zod";

export const createCourseValidator = z.object({
  courseName: z.string().min(2).max(30),
  category: z.string(),
  courseDesciption: z.string().min(10).max(30),
  coursePrice: z.number().min(0).max(9999999),
  thumbnailURL: z.url().optional(),
  highlight: z.array(z.string()),
});

export type CreateCourseInput = z.infer<typeof createCourseValidator>;