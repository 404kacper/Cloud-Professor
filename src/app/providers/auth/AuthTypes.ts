import { ModalTypes } from 'src/app/dashboard/components/modals/ModalContainer';

// types for auth context
export type authContextType = {
  user: any;
  error: any;
  displayModal: ModalTypes;
  clickedFriend: { email: string; key: string };
  login: (user: any) => void;
  register: (user: any) => void;
  verifyUser: () => void;
  adjustUserProperty: (
    property: 'downloadedFiles' | 'totalFiles' | 'uploadedFiles',
    adjustment: 'increment' | 'decrement'
  ) => void;
  setDisplayModal: (type: ModalTypes) => void;
  setClickedFriend: (friend: { email: string; key: string }) => void;
};

// default values for auth context
export const authContextDefaultValue: authContextType = {
  user: null,
  error: null,
  displayModal: ModalTypes.NONE,
  clickedFriend: { email: '', key: '' },
  login: () => {},
  register: () => {},
  verifyUser: () => {},
  adjustUserProperty: () => {},
  setDisplayModal: () => {},
  setClickedFriend: () => {},
};
