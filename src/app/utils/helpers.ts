export function pemToBuffer(pem: string): ArrayBuffer {
  // remove headers before working with the key
  const base64String = pem
    .replace(/-----BEGIN PUBLIC KEY-----/g, '')
    .replace(/-----END PUBLIC KEY-----/g, '')
    .replace(/\n/g, '');
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
