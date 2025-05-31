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
import { authAxios } from "../../serverUrl";
// import { toast } from 'react-toastify';


const LoginPageView = () => {
  const navigate = useNavigate();

  const methods = useForm<LoginFormData>({
    resolver: yupResolver(LoginFormSchema),
    defaultValues: DefaultLoginForm,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const updateShowPasswordState = () => setShowPassword((prev) => !prev);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;


    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    window.location.href = "/";
  };


 const handleLogin = async (loginData: LoginFormData) => {
  try {
    const response = await authAxios.post("/user/login/", loginData);

    const accessToken = response?.data?.access;
    const refreshToken = response?.data?.refresh;

    if (!accessToken) {
      throw new Error("No access token returned from server.");
    }

    // Store tokens
    localStorage.setItem("token", accessToken);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    // Fetch user profile to get role
    const userResponse = await authAxios.get("/user/profile/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    localStorage.setItem("user", JSON.stringify(userResponse.data));

    // enqueueSnackbar("only Farmers are allowed in this page", { variant: "success" });

    // Redirect based on role (optional)
    const role = userResponse.data.role;
    if (role === "farmer") {
      navigate("/farmers");
    } else if (role === "buyer") {
      navigate("/liked-products"); 
      // handleLogout(); // Logout if not a farmer
    } else {
      navigate("/");
      handleLogout();
      // toast.error("You are not allowed to access this page.");
      enqueueSnackbar("only Farmers are allowed in this page.", {
      variant: "error",
    })
  
    }
  } catch (error) {
    console.error("Login error:", error);
    enqueueSnackbar("Login failed. Please check your credentials.", {
      variant: "error",
    });
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
