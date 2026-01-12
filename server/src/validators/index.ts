import {z} from 'zod'

export const signinSchema=z.object({
    email:z.email(),
    password:z.string().min(6,"Minimum 6 character required")

})
export const signupSchema=z.object({
    name:z.string().min(3, "Minimum 3 character required"),
    email:z.email(),
    password:z.string().min(6,"Minimum 6 character required"),
    contactNumber:z.string().min(10,"Minimum 10 character required").max(10,"Maximum 10 character required"),
    address:z.string().min(10,"Minimum 10 character required").max(10,"Maximum 10 character required"),
    profilePicture:z.string().url(),
})
