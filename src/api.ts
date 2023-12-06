import axios, { AxiosError } from "axios";
const baseURL = "http://localhost:3000/api";
const habitHeroApi = axios.create({ baseURL });

const registerUser = async (email: string, name: string, password: string) => {
  try {
    const { data } = await habitHeroApi.post("/users/register", {
      email,
      name,
      password,
    });
    return { data };
  } catch (error) {
    if (error instanceof AxiosError) {
      // const { data, status } = error.response;
      // return { data, status };
    }
    return { error };
  }
};

export { registerUser };
