import { createContext, Dispatch, SetStateAction, useState } from "react";

type AuthStateType = {
  email: string;
  accessToken: string;
};

type AuthContextType = {
  authState: AuthStateType;
  setAuthState: Dispatch<SetStateAction<AuthStateType>>;
};

const defaultAuthContext: AuthContextType = {
  authState: { email: "", accessToken: "" },
  setAuthState: () => {},
};

const initialAuthState = { email: "", accessToken: "" };

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
