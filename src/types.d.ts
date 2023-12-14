type ChildrenType = {
  children: ReactNode;
};

type ValidState = boolean | null;

type ApiReturnType = {
  status: number;
  data: {};
  errorMessage: string;
};

type PasswordRulesType = { description: string; regex: RegExp }[];
