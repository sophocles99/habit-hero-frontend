import axios from "axios";
const baseURL = "http://localhost:3000";
const habitHero = axios.create({ baseURL });

const register = (username: string, password: string) => {
  return habitHero
    .post("/register", { username, password })
    .then((response) => console.log(response))
    .catch((err) => {
      console.log("Axios error:", err);
    });
};

export { register };
