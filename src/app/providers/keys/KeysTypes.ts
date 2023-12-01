// types for auth context
export type keysContextType = {
  publicKey: string;
  privateKey: string;
  iv: string,
  error: any;
  fetchKey: () => void;
};

// default values for auth context
export const keysContextDefaultValue: keysContextType = {
  publicKey: '',
  privateKey: '',
  iv: '',
  error: null,
  fetchKey: () => {},
};
