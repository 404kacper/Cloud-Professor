// types for auth context
export type dataContextType = {
  error: any;
  myFiles: any;
  toMeFiles: any;
  fileIdToDownload: any;
  fileNameToDownload: any;
  fileFormatToDownload: any;
  users: any;
  logs: any;
  uploadFile: (
    data: ArrayBuffer,
    recipientsPublicKey: string,
    name: string,
    size: number,
    recipient?: string
  ) => void;
  retrieveMyFiles: () => void;
  retrieveToMeFiles: () => void;
  retrieveMylogs: () => void;
  deleteMyFile: (id: number, origin: downloadOriginType) => void;
  downloadMyFile: (masterPassword: string) => Promise<ArrayBuffer>;
  findUsers: (email: string) => void;
  setFileIdToDownload: (id: number) => void;
  setFileNameToDownload: (name: string) => void;
  setFileFormatToDownload: (format: string) => void;
};

// default values for auth context
export const dataContextDefaultValue: dataContextType = {
  error: null,
  myFiles: null,
  toMeFiles: null,
  fileIdToDownload: null,
  fileNameToDownload: null,
  fileFormatToDownload: null,
  users: null,
  logs: null,
  uploadFile: () => {},
  retrieveMyFiles: () => {},
  retrieveToMeFiles: () => {},
  retrieveMylogs: () => {},
  deleteMyFile: () => {},
  downloadMyFile: () => Promise.resolve(new ArrayBuffer(0)),
  findUsers: () => {},
  setFileIdToDownload: () => {},
  setFileNameToDownload: () => {},
  setFileFormatToDownload: () => {},
};

export const enum downloadOriginType {
  UPLOAD = 'upload',
  DOWNLOAD = 'download',
}
