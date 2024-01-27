import axios, { isAxiosError } from "axios";
const baseURL = "http://localhost:3000/api";
const api = axios.create({ baseURL });

const checkEmail = async (email: string): Promise<ApiReturnType> => {
  try {
    const response = await api.post("/users/checkemail", { email });
    const {
      status,
      data: { message },
    } = response;
    return { status, message };
  } catch (error) {
    return handleErrors(error);
  }
};

const registerUser = async (
  email: string,
  name: string,
  password: string
): Promise<ApiReturnType> => {
  try {
    const response = await api.post("/users/register", {
      email,
      name,
      password,
    });
    const {
      status,
      data: { message },
    } = response;
    return { status, message };
  } catch (error) {
    return handleErrors(error);
  }
};

const handleErrors = (error: any) => {
  if (isAxiosError(error)) {
    if (error.response) {
      const {
        status,
        data: { errorMessage },
      } = error.response;
      return { status, errorMessage };
    }
    if (error.request) {
      const { status } = error.request;
      return { status, errorMessage: "Network error" };
    }
  }
  const errorMessage =
    error instanceof Error ? error.message : "Application error";
  return { status: -1, errorMessage };
};

export { checkEmail, registerUser };
