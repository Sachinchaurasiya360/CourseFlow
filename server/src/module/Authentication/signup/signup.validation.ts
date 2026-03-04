import zod from 'zod';
export const signupValidation = zod.object({
    name: zod.string().min(1, "Name is required"),
    email: zod.string().email("Invalid email address"),
    password: zod.string().min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
})
 