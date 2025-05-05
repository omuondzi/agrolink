import { enqueueSnackbar } from "notistack";

export const handleErrors = async (error: unknown) => {
  if (error) {
    enqueueSnackbar(error as string, { variant: "error" });
  } else {
    enqueueSnackbar("An unexpected error occurred", { variant: "error" });
  }
};
