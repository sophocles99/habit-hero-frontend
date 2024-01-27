import { createContext, Dispatch, SetStateAction, useState } from "react";

type AuthStateType = {
  isLoggedIn: boolean;
  email: string;
  name: string;
  accessToken: string;
};

type AuthContextType = {
  authState: AuthStateType;
  setAuthState: Dispatch<SetStateAction<AuthStateType>>;
};

const initialAuthState = {
  isLoggedIn: false,
  email: "",
  name: "",
  accessToken: "",
};

const defaultAuthContext: AuthContextType = {
  authState: initialAuthState,
  setAuthState: () => {},
};

const AuthContext = createContext(defaultAuthContext);

export const AuthContextProvider = ({ children }: ChildrenType) => {
  const [authState, setAuthState] = useState(initialAuthState);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
