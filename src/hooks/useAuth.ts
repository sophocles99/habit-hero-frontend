import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const useAuth = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  return { authState, setAuthState };
};

export default useAuth;