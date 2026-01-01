const { z} = require("zod");
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
