type ChildrenType = {
  children: ReactNode;
};

type ValidState = boolean | null;

type ApiReturnType = {
  status: number;
  message?: string;
  errorMessage?: string;
  data?: {};
};

type PasswordRulesType = { description: string; regex: RegExp }[];
