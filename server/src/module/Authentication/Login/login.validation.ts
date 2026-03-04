import zod from 'zod'; 
export const loginValidation = zod.object({
    email: zod.string().email("Invalid email address"),
    password: zod.string().min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
})
