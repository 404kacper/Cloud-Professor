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

    // Convert key back to crypto context
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

// No need to return iv for this one as it's sent encrypted
export async function generateSymmetricKey(): Promise<CryptoKey> {
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'AES-CBC',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );
  return key;
}

export async function encryptDataWithSymmetricKey(
  data: ArrayBuffer,
  key: CryptoKey
): Promise<{ encryptedDataBase64: string; ivBase64: string }> {
  try {
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

export async function encryptSymmetricKeyWithPublicKey(
  symmetricKey: CryptoKey,
  publicKeyPem: string
): Promise<string> {
  try {
    // Convert the PEM formatted public key to an ArrayBuffer
    const publicKeyBuffer = pemToBuffer(publicKeyPem);

    console.log(publicKeyBuffer);

    // Import the public key into the crypto context
    const publicKey = await window.crypto.subtle.importKey(
      'spki',
      publicKeyBuffer,
      {
        name: 'RSA-OAEP',
        hash: { name: 'SHA-256' },
      },
      false, // Public key is not extractable
      ['encrypt']
    );

    console.log(publicKeyBuffer);

    // Export the symmetric key as raw binary data
    const exportedSymmetricKey = await window.crypto.subtle.exportKey(
      'raw',
      symmetricKey
    );

    // Encrypt the symmetric key with the recipient's public key
    const encryptedSymmetricKey = await window.crypto.subtle.encrypt(
      { name: 'RSA-OAEP' },
      publicKey,
      exportedSymmetricKey
    );

    // Convert the encrypted symmetric key to base64 for transmission
    const encryptedSymmetricKeyBase64 = bufferToBase64(encryptedSymmetricKey);

    return encryptedSymmetricKeyBase64;
  } catch (error) {
    console.error('Encryption of symmetric key failed:', error);
    throw new Error('Encryption of symmetric key failed');
  }
}

// Helper functions below

function pemToBuffer(pem: string): ArrayBuffer {
  // remove headers before working with the key
  const base64String = pem
    .replace(/-----BEGIN PUBLIC KEY-----/g, '')
    .replace(/-----END PUBLIC KEY-----/g, '')
    .replace(/\n/g, '');
  return base64ToArrayBuffer(base64String);
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
