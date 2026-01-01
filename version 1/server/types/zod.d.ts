import { z } from "zod";

declare module "../../utils/zodTypes/index" {
  export const signupSchema: z.ZodObject<{
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    password: z.ZodString;
    role: z.ZodString;
  }>;

  export const loginschema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
  }>;

  export const courseSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    coursehighlight: z.ZodOptional<z.ZodArray<z.ZodString>>;
    category: z.ZodOptional<z.ZodString>;
    createdby: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodString>;
  }>;
}
