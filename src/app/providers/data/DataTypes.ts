// types for auth context
export type dataContextType = {
  error: any;
  uploadFile: (
    data: ArrayBuffer,
    recipientsPublicKey: string,
    name: string,
    size: number
  ) => void;
};

// default values for auth context
export const dataContextDefaultValue: dataContextType = {
  error: null,
  uploadFile: () => {},
};
