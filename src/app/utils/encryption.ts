export async function decryptPrivateKey(
  encryptedPrivateKey: string,
  iv: string,
  password: string
): Promise<string> {
  try {
    // Convert IV from hex string to buffer
    const ivBuffer = new Uint8Array(
      iv.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
    );

    // Convert encrypted private key from hex string to buffer
    const encryptedBuffer = new Uint8Array(
      encryptedPrivateKey.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) ||
        []
    );

    // Prepare material for key derivation
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    // Derieve the key from the password
    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: enc.encode('salt'), // Same hardcoded salt as on the backend
        iterations: 100000, // Match the iteration count with backend
        hash: 'SHA-256', // Use the same hash algorithm as on the backend
      },
      keyMaterial,
      { name: 'AES-CBC', length: 256 },
      false,
      ['decrypt']
    );

    // Decrypt the private key
    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-CBC', iv: ivBuffer },
      key,
      encryptedBuffer
    );

    return new TextDecoder().decode(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw error;
  }
}

export async function generateSymmetricKey(): Promise<string> {
  try {
    // Generate a new symmetric key
    const key = await window.crypto.subtle.generateKey(
      {
        name: 'AES-CBC',
        length: 256,
      },
      true, // The key is extractable to other formats
      ['encrypt', 'decrypt']
    );

    // Export the key as raw binary data
    const exportedKey = await window.crypto.subtle.exportKey('raw', key);

    // Use a Blob to handle binary data efficiently
    const blob = new Blob([exportedKey]);
    const blobAsArrayBuffer = await new Response(blob).arrayBuffer();

    // Convert ArrayBuffer to Base64 string
    const base64Key = bufferToBase64(blobAsArrayBuffer);

    return base64Key;
  } catch (error) {
    console.error('Key generation failed:', error);
    throw error;
  }
}

export async function encryptDataWithSymmetricKey(
  data: ArrayBuffer,
  base64Key: string
): Promise<{ encryptedDataBase64: string; ivBase64: string }> {
  try {
    // Convert the Base64-encoded key back to an ArrayBuffer
    const keyBuffer = base64ToArrayBuffer(base64Key);

    // Import the key back into the crypto context
    const key = await window.crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: 'AES-CBC', length: 256 },
      true,
      ['encrypt']
    );

    // Generate an Initialization Vector (IV)
    const iv = window.crypto.getRandomValues(new Uint8Array(16));

    // Encrypt the data
    const encryptedData = await window.crypto.subtle.encrypt(
      { name: 'AES-CBC', iv: iv },
      key,
      data
    );

    const encryptedDataBase64 = bufferToBase64(encryptedData);
    const ivBase64 = bufferToBase64(iv);

    return { encryptedDataBase64, ivBase64 };
  } catch (error) {
    console.error('Encryption failed:', error);
    throw error;
  }
}

function bufferToBase64(buffer: ArrayBuffer): string {
  const binary = String.fromCharCode.apply(
    null,
    new Uint8Array(buffer) as unknown as number[]
  );
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// git commit -m "Created client side encryption methods (symmetric key generation & file encryption using symmetric key"
