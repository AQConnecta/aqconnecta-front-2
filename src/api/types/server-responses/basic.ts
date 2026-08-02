export type BasicServerResponse<T, Status extends number = number> = {
  message: string;
  status: Status;
  data: T | null;
};

export type BasicServerValidationErrors<FormType> = {
  [K in keyof FormType]: string[];
};
