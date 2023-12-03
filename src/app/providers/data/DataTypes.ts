// types for auth context
export type dataContextType = {
  error: any;
  uploadFile: (data: ArrayBuffer) => void;
};

// default values for auth context
export const dataContextDefaultValue: dataContextType = {
  error: null,
  uploadFile: (data: ArrayBuffer) => {},
};
