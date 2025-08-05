const { z, email, string } = require("zod");
const signupSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(6),
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

module.exports = { signupSchema,loginschema };
