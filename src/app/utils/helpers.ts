export function pemToBuffer(pem: string, isPrivateKey: boolean): ArrayBuffer {
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

export function bufferToBase64(buffer: ArrayBuffer): string {
  const binary = String.fromCharCode.apply(
    null,
    new Uint8Array(buffer) as unknown as number[]
  );
  return btoa(binary);
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
