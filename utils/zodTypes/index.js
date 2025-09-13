const { z, email, string } = require("zod");
const signupSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(6),
  role: z.string(),
});
const loginschema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const userSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(6),
  contactNo: z.number(),
});
const courseSchema = z.object({
  title: z.string().min(5),
  description: z.string(),
  price: z.number(),
  coursehighlight: z.array(z.string()).optional(),
  category: z.string().optional(),
  createdby: z.string().optional(),
  createdAt: z.string().optional(),
});
module.exports = { signupSchema, loginschema, courseSchema };
