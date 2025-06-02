import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, Textarea } from "@heroui/react";
import { enqueueSnackbar } from "notistack";
import { publicAxios } from "../../serverUrl";
import {
  ContactUsFormData,
  ContactUsFormSchema,
  DefaultContacUsForm,
} from "./contact-us-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { H5 } from "../../components/typography";

const ContactUsPageView = () => {
  const methods = useForm<ContactUsFormData>({
    resolver: yupResolver(ContactUsFormSchema),
    mode: "all",
    defaultValues: DefaultContacUsForm,
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = methods;
  const handleSignUp = async () => {
    const registrationData = {
      name: methods.getValues("name"),

      phone_number: methods.getValues("phone"),
      email: methods.getValues("email"),
      feedback: methods.getValues("feedback"),
    };

    try {
      const response = await publicAxios.post(
        "/feedback/post/",
        registrationData
      );
      console.log("Feedback response:", response.data);

      enqueueSnackbar("Your feedback has been received.", {
        variant: "success",
      });
      reset();
    } catch (error) {
      console.error("Signup error:", error);

      // handleErrors(error);
      enqueueSnackbar("Your feedback could not be sent.", { variant: "error" });
    }
  };
  return (
    <section>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="my-[3rem]  md:w-[400px]  w-full container border-3 border-primary rounded-3xl p-[2rem]"
        >
          <div>
            <H5 className=" text-center text-primary py-2">Get in touch.</H5>
          </div>
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
          </div>{" "}
          <div className="mb-3">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Phone"
                  type="phone"
                  radius="full"
                  isInvalid={!!errors?.phone}
                  errorMessage={errors?.phone?.message}
                />
              )}
            />
          </div>{" "}
          <div className="mb-3">
            <Controller
              name="feedback"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Feedback"
                  type="text"
                  radius="full"
                  isInvalid={!!errors?.feedback}
                  errorMessage={errors?.feedback?.message}
                />
              )}
            />
          </div>{" "}
          <Button
            color="primary"
            className=" my-4 text-white"
            fullWidth
            radius="full"
            type="submit"
            isLoading={isSubmitting}
          >
            Send
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default ContactUsPageView;
