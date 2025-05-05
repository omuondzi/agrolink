import { Controller, useForm } from "react-hook-form";
import {
  DefaultResetPasswordData,
  ResetPasswordData,
  ResetPasswordSchema,
} from "./authValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { handleErrors } from "../../libs/handle-errors";
import { Input, Button } from "@heroui/react";
import { Subtitle2, Paragraph } from "../../components/typography";

const ResetPasswordView = () => {
  const navigate = useNavigate();
  const [isReset, setReset] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);

  const updateShowPasswordState = () => setShowPassword((prev) => !prev);
  const updateShowPassword2State = () => setShowPassword2((prev) => !prev);

  const methods = useForm<ResetPasswordData>({
    resolver: yupResolver(ResetPasswordSchema),
    mode: "all",
    defaultValues: DefaultResetPasswordData,
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const handleResetPassword = async (data: ResetPasswordData) => {
    try {
      // const { status } = await axiosInstance.post(`/auth/reset-password/`, {
      //   password: data.newPassword,
      //   token,
      // });
      console.log(data);
      enqueueSnackbar("Password Reset Successfully!", { variant: "success" });
      setReset(true);

      enqueueSnackbar("Password Could not be reset!", { variant: "error" });
    } catch (error) {
      handleErrors(error);
    }
  };

  {
    isReset && navigate("/auth/login", { replace: true });
  }
  return (
    <main>
      <form onSubmit={handleSubmit(handleResetPassword)}>
        <Subtitle2 className=" my-2 text-secondary text-center">
          Reset your password &nbsp;
        </Subtitle2>
        <Paragraph className="text-sm text-secondary-400 text-center py-3">
          Set your new password below. Passwords should be secure i.e include
          special charactes, uppercase and lowercase, and also of a minimum
          length of 8
        </Paragraph>
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              size="sm"
              label="Enter new password"
              radius="full"
              className="mb-3"
              type={showPassword ? "text" : "password"}
              isInvalid={!!errors?.newPassword}
              errorMessage={errors?.newPassword?.message}
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
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              size="sm"
              label="Confirm new password"
              radius="full"
              className="mb-3"
              type={showPassword2 ? "text" : "password"}
              isInvalid={!!errors?.confirmPassword}
              errorMessage={errors?.confirmPassword?.message}
              endContent={
                <Button
                  isIconOnly
                  size="sm"
                  radius="full"
                  variant="light"
                  onClick={updateShowPassword2State}
                >
                  <Icon
                    className="text-[#8f8f8f]"
                    icon={showPassword2 ? "mdi:eye-off" : "mdi:eye"}
                    fontSize={24}
                  />
                </Button>
              }
            />
          )}
        />

        <div>
          <Button
            color="primary"
            fullWidth
            onClick={handleSubmit(handleResetPassword)}
            isLoading={isSubmitting}
          >
            Reset
          </Button>
        </div>
      </form>
    </main>
  );
};

export default ResetPasswordView;
