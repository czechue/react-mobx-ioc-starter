import React, { ReactNode, useContext, useState } from "react";

type ValidationContextProps = {
  clientValidationMessages: string[];
  // eslint-disable-next-line no-unused-vars
  updateClientValidationMessages: React.Dispatch<
    React.SetStateAction<string[]>
  >;
};

const ValidationContext = React.createContext<
  ValidationContextProps | undefined
>(undefined);

type ValidationProviderProps = {
  children: ReactNode;
};

export const ValidationProvider = (props: ValidationProviderProps) => {
  const [clientValidationMessages, updateClientValidationMessages] = useState<
    string[]
  >([]);

  return (
    <ValidationContext.Provider
      value={{ clientValidationMessages, updateClientValidationMessages }}
    >
      {props.children}
    </ValidationContext.Provider>
  );
};

export function useValidation() {
  const context = useContext(ValidationContext);

  if (context === undefined) {
    throw new Error("useValidation must be used within a ValidationProvider");
  }

  return context;
}
