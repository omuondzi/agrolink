import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";

import { Controller, FormProvider, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { authAxios } from "../../serverUrl";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { USER } from ".";
import {
  DefaultUpdateProfileForm,
  UpdateProfileFormData,
  UpdateProfileFormSchema,
} from "./update-profile-validation";

interface ProfileModalProps {
  isOpen: boolean;
  title: string;
  onOpenChange: (isOpen: boolean) => void;
}
const EditProfileModal = ({
  isOpen,
  onOpenChange,
  title,
}: ProfileModalProps) => {
  const [userData, setUserData] = useState<USER>();

  const navigate = useNavigate();

  const methods = useForm<UpdateProfileFormData>({
    resolver: yupResolver(UpdateProfileFormSchema),
    defaultValues: DefaultUpdateProfileForm,
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const handleSignUp = async () => {
    const registrationData = {
      name: methods.getValues("name"),
      role: methods.getValues("accountType"),
      phone_number: methods.getValues("phone"),
      email: methods.getValues("email"),
    };

    try {
      const response = await authAxios.patch(
        "/user/update-profile/",
        registrationData
      );
      console.log("Profile edit response:", response.data);

      enqueueSnackbar("Profile updated", { variant: "success" });

      navigate("/profile");
    } catch (error) {
      console.error("Profile edit error:", error);

      // handleErrors(error);
      enqueueSnackbar("Faied to edit. Please try again.", { variant: "error" });
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await authAxios.get("/user/profile/");
      setUserData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      // setError('Failed to load profile data.');
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    if (userData) {
      setValue("accountType", userData.role);
      setValue("name", userData.name);
      setValue("email", userData.email);
      setValue("phone", userData.phone_number);
    }
  }, [userData, setValue]);

  return (
    <section>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="lg">
        <ModalContent>
          {" "}
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(handleSignUp)}
                className="mt-5 md:w-[300px] mb-2 w-full container"
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
                </div>{" "}
                <div className="mb-3">
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Phone"
                        type="tel"
                        radius="full"
                        isInvalid={!!errors?.phone}
                        errorMessage={errors?.phone?.message}
                      />
                    )}
                  />
                </div>{" "}
                <div className="mb-3">
                  <Controller
                    name="accountType"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Account type"
                        disabled
                        type="text"
                        radius="full"
                        isInvalid={!!errors?.accountType}
                        errorMessage={errors?.accountType?.message}
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
                  Update
                </Button>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default EditProfileModal;
