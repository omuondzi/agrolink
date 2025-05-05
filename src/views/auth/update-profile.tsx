import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, useForm } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

import {
  UpdateProfileData,
  UpdateProfileSchema,
  DefaultUpdateProfileForm,
} from "./authValidation";

import { enqueueSnackbar } from "notistack";

import { Input, Button } from "@heroui/react";
import { Subtitle2 } from "../../components/typography";
import { handleErrors } from "../../libs/handle-errors";

const UpdateProfileView = () => {
  const methods = useForm<UpdateProfileData>({
    resolver: yupResolver(UpdateProfileSchema),
    mode: "all",
    defaultValues: DefaultUpdateProfileForm,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },

    reset,
    control,
  } = methods;
  const handleUpdateProfile = async (data: UpdateProfileData) => {
    try {
      // await axiosInstance.patch("/auth/update-profile", {
      //   email: data.email.trim().toLocaleLowerCase(),
      //   name: data.name,
      //   phone: data.phone,
      // });
      console.log(data);
      reset();
      enqueueSnackbar("Profile succesfully updated!", { variant: "success" });
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <main className="flex items-center justify-center">
      <section className=" px-4 py-8 rounded-3xl  md:px-4 md:py-8 flex flex-col justify-center items-center border-2  md:w-[400px] w-[320px]">
        <FormProvider {...methods}>
          <Subtitle2 className="text-primary text-center">
            Update your profile
          </Subtitle2>
          <form
            className="mt-5 md:w-[300px] mb-2 w-full"
            onSubmit={handleSubmit(handleUpdateProfile)}
          >
            <div className="mb-3">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Username"
                    type="text"
                    radius="full"
                    isClearable
                    isInvalid={!!errors?.name}
                    errorMessage={errors?.name?.message}
                  />
                )}
              />
            </div>

            <div className="mb-3">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Email"
                    type="email"
                    radius="full"
                    isInvalid={!!errors?.email}
                    errorMessage={errors?.email?.message}
                  />
                )}
              />
            </div>
            <div className="mb-3">
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <PhoneInput
                      {...field}
                      placeholder=""
                      international
                      defaultCountry="KE"
                      error={
                        error
                          ? error.message
                          : field?.value && isValidPhoneNumber(field?.value)
                          ? undefined
                          : "Invalid phone number"
                      }
                      className="border-[0.12rem] p-[0.3rem] rounded-3xl py-[0.5rem] border-secondary-200"
                    />
                  </div>
                )}
              />
            </div>

            <Button
              color="primary"
              className=" my-4 text-white"
              fullWidth
              radius="full"
              type="submit"
              isLoading={isSubmitting}
            >
              Update
            </Button>
          </form>
        </FormProvider>
      </section>
    </main>
  );
};

export default UpdateProfileView;
