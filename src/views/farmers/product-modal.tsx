import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";

import { Controller, useForm } from "react-hook-form";
import { handleErrors } from "../../libs/handle-errors";
import {
  DefaultPostProductData,
  PostProductFormData,
  PostProductSchema,
} from "./post-product-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { authAxios } from "../../serverUrl";


export const animals = [
  { key: "vegetable", label: "Vegetable" },
  { key: "fruit", label: "Fruit" },
  { key: "dairy", label: "Dairy" },
  { key: "grain", label: "Grain" },
];

interface ProductModalProps {
  isOpen: boolean;
  title: string;
  onOpenChange: (isOpen: boolean) => void;
}
const AddProductModal = ({
  isOpen,
  onOpenChange,
  title,
}: ProductModalProps) => {
  const methods = useForm<PostProductFormData>({
    resolver: yupResolver(PostProductSchema),
    defaultValues: DefaultPostProductData,
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const handlePost = async (data: PostProductFormData) => {

    try {
      // const formData = new FormData();
      // formData.append("name", data.name);
      // formData.append("category", data.category); 
      // formData.append("price", data.price.toString());
      // formData.append("description", data.description);
      // if (data.image) {
      //   formData.append("image", data.image);
      // }
      const response = await authAxios.post('products/create', data)
      console.log("Product posted successfully:", response.data);
      onOpenChange(false); 
      console.log(data);
    } catch (errors) {
      handleErrors(errors);
    }
  };

  return (
    <section>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="lg">
        <ModalContent>
          {" "}
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            <form
              onSubmit={handleSubmit(handlePost)}
              className="w-full md:w-[300px] mt-5 mb-2 container"
            >
              <div className="mb-3">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Enter Product Name"
                      type="email"
                      radius="full"
                      isInvalid={!!errors?.name}
                      errorMessage={errors?.name?.message}
                    />
                  )}
                />
              </div>
              <div className="mb-3">
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      radius="full"
                      className="max-w-xs"
                      label="Enter product category"
                      onChange={field.onChange}
                      value={field.value}
                      isInvalid={!!errors.category}
                      errorMessage={!!errors.category?.message}
                    >
                      {animals.map((animal) => (
                        <SelectItem key={animal.key}>{animal.label}</SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>
              <div className="mb-3">
                <Controller
                  control={control}
                  name="price"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Enter Product Price"
                      type="number"
                      value={field.value?.toString() || ""}
                      onChange={(event) => field.onChange(event.target.value)}
                      placeholder="2,500.00"
                      radius="full"
                      isInvalid={!!errors.price}
                      errorMessage={errors.price?.message}
                    />
                  )}
                />
              </div>
              <div className="mb-3">
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Enter Product Description"
                      type="email"
                      radius="full"
                      isInvalid={!!errors?.description}
                      errorMessage={errors?.description?.message}
                    />
                  )}
                />
              </div>

              {/* ✅ Image Upload Field */}
              <div className="mb-3">
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-gray-500 ">
                        Upload Product Image
                      </label>
                      <input
                        type="file"
                        className=" border-none text-sm"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                      />
                      {field.value && typeof field.value === "object" && (
                        <img
                          src={URL.createObjectURL(field.value)}
                          alt="Preview"
                          className="mt-2 w-32 h-32 object-cover rounded-md border"
                        />
                      )}
                    </div>
                  )}
                />
              </div>

              <Button
                className=" my-4  text-white"
                color="primary"
                fullWidth
                radius="full"
                type="submit"
                isLoading={isSubmitting}
              >
                Post
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default AddProductModal;
