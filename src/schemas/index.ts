import {z} from "zod";


const stringToValidDate = z.string().transform((dateString, ctx) => {
  const date = new Date(dateString);
  if (!z.date().safeParse(date).success) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_date,
    });
  }
  return date;
});


const BaseSchema = z.object({
  imageName: z.string().refine((value) => /^[a-zA-Z ]+$/.test(value), {
    message: "Name should not contain symbols or numbers",
  }),


});


export default BaseSchema;