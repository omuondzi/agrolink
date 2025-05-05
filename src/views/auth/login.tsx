import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { enqueueSnackbar } from "notistack";

import { useState } from "react";
import {
  DefaultLoginForm,
  LoginFormData,
  LoginFormSchema,
} from "./authValidation";

import { Icon } from "@iconify/react/dist/iconify.js";

import { useNavigate, Link } from "react-router-dom";
import { Input, Button } from "@heroui/react";
import { Subtitle2 } from "../../components/typography";
import { handleErrors } from "../../libs/handle-errors";

const LoginPageView = () => {
  const navigate = useNavigate();

  const methods = useForm<LoginFormData>({
    resolver: yupResolver(LoginFormSchema),
    defaultValues: DefaultLoginForm,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const updateShowPasswordState = () => setShowPassword((prev) => !prev);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const handleLogin = async (loginData: LoginFormData) => {
    try {
      // await login({ ...loginData });
      console.log(loginData);

      enqueueSnackbar("Logged In Successfully!", { variant: "success" });
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <Subtitle2 className=" text-secondary-400">
        Login to continue &nbsp;
      </Subtitle2>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full md:w-[300px] mt-5 mb-2"
      >
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
            name="password"
            render={({ field }) => (
              <Input
                label="Password"
                radius="full"
                isInvalid={!!errors?.password}
                errorMessage={errors?.password?.message}
                {...field}
                type={showPassword ? "text" : "password"}
                endContent={
                  <Button
                    isIconOnly
                    size="sm"
                    radius="full"
                    variant="light"
                    onClick={updateShowPasswordState}
                  >
                    <Icon
                      className="text-[#8f8f8f]"
                      icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                      fontSize={24}
                    />
                  </Button>
                }
              />
            )}
          />
        </div>

        <Subtitle2 className="text-secondary px-2 text-[12px] md:text-base">
          Forgot Password? &nbsp;
          <Link
            color="primary"
            className="font-medium text-[12px] md:text-base underline cursor-pointer text-primary"
            to="/auth/forgot-password"
          >
            Click here
          </Link>
        </Subtitle2>

        <Button
          className="bg-primary my-4  text-white"
          fullWidth
          radius="full"
          type="submit"
          isLoading={isSubmitting}
        >
          Get In
        </Button>
      </form>

      <Subtitle2 className="mt-3 text-[12px] md:text-base text-secondary whitespace-nowrap">
        Don't have an account? &nbsp;
        <Link
          color="primary"
          className="font-medium text-[12px] md:text-base underline cursor-pointer  text-primary"
          to="/auth/signup"
        >
          Signup
        </Link>
      </Subtitle2>
    </FormProvider>
  );
};

export default LoginPageView;
