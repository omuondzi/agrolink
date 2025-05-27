import * as yup from "yup";

export const PostProductSchema = yup
  .object({
    image: yup
      .string()

      .required("Please select an image."),
    price: yup.number().required("Please Enter your email"),
    name: yup.string().required("Please enter product name"),
    category: yup.string().required("Please choose a category"),

    description: yup.string().required("Add a description."),
  })
  .required();

export type PostProductFormData = yup.InferType<typeof PostProductSchema>;

export const DefaultPostProductData = {
    image: "",
    price: 0,
    name: "",
    category: "",
    description: ""
} satisfies PostProductFormData;
