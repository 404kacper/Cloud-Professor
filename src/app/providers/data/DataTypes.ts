// types for auth context
export type dataContextType = {
  error: any;
  myFiles: any;
  toMeFiles: any;
  uploadFile: (
    data: ArrayBuffer,
    recipientsPublicKey: string,
    name: string,
    size: number
  ) => void;
  retrieveMyFiles: () => void;
  retrieveToMeFiles: () => void;
  deleteMyFile: (id: number) => void;
};

// default values for auth context
export const dataContextDefaultValue: dataContextType = {
  error: null,
  myFiles: null,
  toMeFiles: null,
  uploadFile: () => {},
  retrieveMyFiles: () => {},
  retrieveToMeFiles: () => {},
  deleteMyFile: () => {},
};
