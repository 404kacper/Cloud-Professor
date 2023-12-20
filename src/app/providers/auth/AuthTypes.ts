// types for auth context
export type authContextType = {
  user: any;
  error: any;
  displaySetupModal: boolean;
  login: (user: any) => void;
  register: (user: any) => void;
  verifyUser: () => void;
  adjustUserProperty: (
    property: 'downloadedFiles' | 'totalFiles' | 'uploadedFiles',
    adjustment: 'increment' | 'decrement'
  ) => void;
  setDisplaySetupModal: (value: boolean) => void;
};

// default values for auth context
export const authContextDefaultValue: authContextType = {
  user: null,
  error: null,
  displaySetupModal: false,
  login: () => {},
  register: () => {},
  verifyUser: () => {},
  adjustUserProperty: () => {},
  setDisplaySetupModal: () => {},
};
