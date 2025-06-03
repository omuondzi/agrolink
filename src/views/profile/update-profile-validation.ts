import * as yup from "yup";

export const UpdateProfileFormSchema = yup
  .object({
    name: yup
      .string()
      .matches(
        /^[a-zA-Z0-9_@.!#()\\-]+$/,
        "Username can only contain letters, numbers, underscores, hyphens, and @ symbol"
      )
      .required("Please Enter your link extension"),
    email: yup
      .string()
      .required("Please Enter your email")
      .matches(/^\S+@\S+\.\S+$/, "Enter a valid email address"),
    phone: yup.string().required("Please Enter your phone number"),
    accountType: yup.string().required(""),
  })
  .required();

export type UpdateProfileFormData = yup.InferType<
  typeof UpdateProfileFormSchema
>;

export const DefaultUpdateProfileForm = {
  name: "",
  email: "",
  phone: "",

  accountType: "",
} satisfies UpdateProfileFormData;
