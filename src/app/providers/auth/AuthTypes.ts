import { ModalTypes } from 'src/app/dashboard/components/modals/ModalContainer';

// types for auth context
export type authContextType = {
  user: any;
  error: any;
  displayModal: ModalTypes;
  login: (user: any) => void;
  register: (user: any) => void;
  verifyUser: () => void;
  adjustUserProperty: (
    property: 'downloadedFiles' | 'totalFiles' | 'uploadedFiles',
    adjustment: 'increment' | 'decrement'
  ) => void;
  setDisplayModal: (type: ModalTypes) => void;
};

// default values for auth context
export const authContextDefaultValue: authContextType = {
  user: null,
  error: null,
  displayModal: ModalTypes.NONE,
  login: () => {},
  register: () => {},
  verifyUser: () => {},
  adjustUserProperty: () => {},
  setDisplayModal: () => {},
};
