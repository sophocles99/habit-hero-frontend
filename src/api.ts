import axios, { isAxiosError } from "axios";
const baseURL = "http://localhost:3000/api";
const habitHeroApi = axios.create({ baseURL });

const registerUser = async (
  email: string,
  name: string,
  password: string
): Promise<ApiReturnType> => {
  try {
    const response = await habitHeroApi.post("/users/register", {
      email,
      name,
      password,
    });
    const { status, data } = response;
    return { status, data, errorMessage: "" };
  } catch (error) {
    console.log(error);
    if (isAxiosError(error)) {
      if (error.response) {
        const { status, data } = error.response;
        return { data, status, errorMessage: data.errorMessage };
      }
      if (error.request) {
        const { status } = error.request;
        return { status, data: {}, errorMessage: "Network error" };
      }
    }
    const errorMessage = error instanceof Error ? error.message : "";
    return { status: 0, data: {}, errorMessage };
  }
};

export { registerUser };
