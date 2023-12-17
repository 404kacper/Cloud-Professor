export function pemToBuffer(pem: string, isPrivateKey: boolean) {
  let base64String = pem;
  if (isPrivateKey) {
    // Remove headers and footers for private key
    base64String = base64String
      .replace(/-----BEGIN PRIVATE KEY-----/g, '')
      .replace(/-----END PRIVATE KEY-----/g, '')
      .replace(/\n/g, '');
  } else {
    // Remove headers and footers for public key
    base64String = base64String
      .replace(/-----BEGIN PUBLIC KEY-----/g, '')
      .replace(/-----END PUBLIC KEY-----/g, '')
      .replace(/\n/g, '');
  }
  return base64ToArrayBuffer(base64String);
}

export function bufferToBase64(buffer: ArrayBuffer): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const blob: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const reader: FileReader = new FileReader();

    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data: string | ArrayBuffer | null = reader.result;
      if (typeof base64data === 'string') {
        resolve(base64data.split(',')[1]); // Split and get data after the comma
      } else {
        reject(new Error('Unexpected result type'));
      }
    };
    reader.onerror = (error: ProgressEvent<FileReader>) => {
      reject(error);
    };
  });
}


export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
