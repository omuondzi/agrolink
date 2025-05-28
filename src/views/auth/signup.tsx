import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  RegistrationFormSchema,
  DefaultRegistrationForm,
  RegistrationFormData,
} from './authValidation';

import { Icon } from '@iconify/react/dist/iconify.js';
import { enqueueSnackbar } from 'notistack';

import { useNavigate } from 'react-router-dom';
import { Input, Button, Link } from '@heroui/react';
import { Subtitle2 } from '../../components/typography';
import { authAxios } from '../../serverUrl';
// import { handleErrors } from '../../libs/handle-errors';


const SignupPageView = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const updateShowPasswordState = () => setShowPassword((prev) => !prev);

  const methods = useForm<RegistrationFormData>({
    resolver: yupResolver(RegistrationFormSchema),
    mode: 'all',
    defaultValues: DefaultRegistrationForm,
  });

  const clearUsernameField = () => {
    setValue('name', '');
  };

  const handleSignUp = async () => {
    const registrationData = {
      name: methods.getValues('name'),
      // phone: methods.getValues('phoneNumber'), 
      email: methods.getValues('email'),
      password: methods.getValues('password'),
    };

    try {
      const response = await authAxios.post('/user/signup/', registrationData);
      console.log('Signup response:', response.data);

      enqueueSnackbar('Welcome on board!', { variant: 'success' });

      navigate('/auth/login');
    } catch (error) {
      console.error('Signup error:', error);
      // handleErrors(error);
      enqueueSnackbar('Signup failed. Please try again.', { variant: 'error' });
    }
  };

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = methods;

  return (
    <FormProvider {...methods}>
      <Subtitle2 className="  text-secondary-400">Get Started &nbsp;</Subtitle2>

      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="mt-5 md:w-[300px] mb-2 w-full"
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
                onClear={clearUsernameField}
                isInvalid={!!errors?.name}
                errorMessage={errors?.name?.message}
              />
            )}
          />
        </div>
        {/* <div className="mb-3">
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Phone Number"
                type="tel"
                radius="full"
                isClearable
                onClear={clearUsernameField}
                isInvalid={!!errors?.name}
                errorMessage={errors?.name?.message}
              />
            )}
          />
        </div> */}

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
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Password"
                radius="full"
                type={showPassword ? 'text' : 'password'}
                isInvalid={!!errors?.password}
                errorMessage={errors?.password?.message}
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
                      icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                      fontSize={24}
                    />
                  </Button>
                }
              />
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
          Sign Up
        </Button>
      </form>
      <Subtitle2 className="text-secondary text-[12px] md:text-base whitespace-nowrap">
        Already have an account? &nbsp;
        <Link
          color="primary"
          //   className="font-medium cursor-pointer no-underline text-primary"
          underline="always"
          onClick={() => navigate('/auth/login')}
          size="sm"
          className="cursor-pointer text-[12px] md:text-base"
        >
          Login
        </Link>
      </Subtitle2>
    </FormProvider>
  );
};

export default SignupPageView;
