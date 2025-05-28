import * as yup from "yup";

export const RegistrationFormSchema = yup
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
    accountType: yup.string().required(""),
    password: yup
      .string()
      .required("Please Enter your password")
      .matches(
        // eslint-disable-next-line no-useless-escape
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: yup
      .string()
      .required("Please confirm password.")
      .oneOf([yup.ref("password")], "Passwords do not match."),
  })
  .required();

export type RegistrationFormData = yup.InferType<typeof RegistrationFormSchema>;

export const DefaultRegistrationForm = {
  name: "",
  email: "",
  // phoneNumber: "",
  password: "",
  confirmPassword: "",
  accountType: "",
} satisfies RegistrationFormData;

export const UpdateProfileSchema = yup
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
  })
  .required();

export type UpdateProfileData = yup.InferType<typeof UpdateProfileSchema>;

export const DefaultUpdateProfileForm = {
  name: "",
  email: "",
  phone: "",
} satisfies UpdateProfileData;

export const ForgotPasswordSchema = yup
  .object({
    email: yup
      .string()
      .required("Please Enter your email")
      .matches(/^\S+@\S+\.\S+$/, "Enter a valid email address"),
  })
  .required();

export type ForgotPasswordData = yup.InferType<typeof ForgotPasswordSchema>;

export const DefaultForgotPassword = {
  email: "",
} satisfies ForgotPasswordData;

export const ResetPasswordSchema = yup
  .object({
    newPassword: yup
      .string()
      .required("Please Enter your new password")
      .matches(
        // eslint-disable-next-line no-useless-escape
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("newPassword")], "Passwords do not match"),
  })
  .required();

export type ResetPasswordData = yup.InferType<typeof ResetPasswordSchema>;

export const DefaultResetPasswordData = {
  newPassword: "",
  confirmPassword: "",
} satisfies ResetPasswordData;

//login
export const LoginFormSchema = yup
  .object({
    email: yup
      .string()
      .required("Please Enter your email")
      .matches(/^\S+@\S+\.\S+$/, "Enter a valid email address"),
    password: yup.string().required("Please Enter your password"),
  })
  .required();

export type LoginFormData = yup.InferType<typeof LoginFormSchema>;

export const DefaultLoginForm = {
  email: "",
  password: "",
} satisfies LoginFormData;
