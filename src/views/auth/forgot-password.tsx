import { enqueueSnackbar } from "notistack";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  DefaultForgotPassword,
  ForgotPasswordData,
  ForgotPasswordSchema,
} from "./authValidation";

import { handleErrors } from "../../libs/handle-errors";
import { Subtitle2 } from "../../components/typography";
import { Button, Input } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";

const ForgotPasswordView = () => {
  const methods = useForm<ForgotPasswordData>({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: DefaultForgotPassword,
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const handleForget = async (data: ForgotPasswordData) => {
    try {
      // await axiosInstance.post("/auth/forgot-password", {
      //   email: data.email.trim().toLocaleLowerCase(),
      // });

      enqueueSnackbar("Email sent with password reset instructions", {
        variant: "success",
      });
      console.log(data);
      reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      handleErrors(error);
    }
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleForget)}
        className="w-full md:w-[300px]"
      >
        <Subtitle2 className="  text-center text-secondary-400 mb-3">
          Let's help you recover your account
        </Subtitle2>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              type="email"
              label="Email"
              {...field}
              size="sm"
              radius="full"
              isInvalid={!!errors?.email}
              errorMessage={errors?.email?.message}
            />
          )}
        />
        <div className="grid grid-cols-2  gap-7 my-3">
          {" "}
          <Button
            className="bg-primary  text-white"
            fullWidth
            type="submit"
            isLoading={isSubmitting}
          >
            Recover
          </Button>
          <Link to={`/auth/login`}>
            {" "}
            <Button fullWidth>Login</Button>
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export default ForgotPasswordView;
