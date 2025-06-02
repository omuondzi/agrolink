import * as yup from "yup";

export const ContactUsFormSchema = yup
  .object({
    name: yup
      .string()
      .matches(/^[A-Za-z\s]+$/, "Username can only contain letters")
      .required("Please Enter your link extension"),
    email: yup
      .string()
      .required("Please Enter your email")
      .matches(/^\S+@\S+\.\S+$/, "Enter a valid email address"),
    phone: yup.string().required("Please Enter your phone number"),
    feedback: yup.string().required("Please add your feedback"),
  })
  .required();

export type ContactUsFormData = yup.InferType<typeof ContactUsFormSchema>;

export const DefaultContacUsForm = {
  name: "",
  email: "",
  phone: "",
  feedback: "",
} satisfies ContactUsFormData;
