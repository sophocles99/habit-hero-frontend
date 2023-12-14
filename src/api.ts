import axios, { isAxiosError } from "axios";
const baseURL = "http://localhost:3000/api";
const api = axios.create({
  baseURL,
  validateStatus: (status) => status >= 200 && status < 500,
});

const checkEmail = async (email: string): Promise<ApiReturnType> => {
  try {
    const response = await api.post("users/checkemail", { email });
    const {
      status,
      data,
      data: { errorMessage },
    } = response;
    return { status, data, errorMessage };
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
    const { status, data } = response;
    return { status, data, errorMessage: "" };
  } catch (error) {
    return handleErrors(error);
  }
};

const handleErrors = (error: any) => {
  console.log(error);

  if (isAxiosError(error)) {
    if (error.response) {
      const { status, data } = error.response;
      return { status, data, errorMessage: data.errorMessage };
    }
    if (error.request) {
      const { status } = error.request;
      return { status, data: {}, errorMessage: "Network error" };
    }
  }

  const errorMessage = error instanceof Error ? error.message : "";
  return { status: 0, data: {}, errorMessage };
};

export { checkEmail as checkEmail, registerUser };
