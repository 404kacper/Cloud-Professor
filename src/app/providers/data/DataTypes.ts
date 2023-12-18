// types for auth context
export type dataContextType = {
  error: any;
  myFiles: any;
  toMeFiles: any;
  users: any;
  uploadFile: (
    data: ArrayBuffer,
    recipientsPublicKey: string,
    name: string,
    size: number
  ) => void;
  retrieveMyFiles: () => void;
  retrieveToMeFiles: () => void;
  deleteMyFile: (id: number, origin: downloadOriginType) => void;
  downloadMyFile: (id: number) => Promise<ArrayBuffer>;
  findUsers: (email: string) => void;
};

// default values for auth context
export const dataContextDefaultValue: dataContextType = {
  error: null,
  myFiles: null,
  toMeFiles: null,
  users: null,
  uploadFile: () => {},
  retrieveMyFiles: () => {},
  retrieveToMeFiles: () => {},
  deleteMyFile: () => {},
  downloadMyFile: () => Promise.resolve(new ArrayBuffer(0)),
  findUsers: () => {},
};

export const enum downloadOriginType {
  UPLOAD = 'upload',
  DOWNLOAD = 'download',
}
