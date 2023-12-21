import CryptoUserManager from '../CryptoUserManager';
import { bufferToBase64, base64ToArrayBuffer, pemToBuffer } from '../helpers';

class EncryptionKeyManager extends CryptoUserManager {
  async decryptPrivateKey(
    encryptedPrivateKey: string,
    iv: string,
    password: string
  ): Promise<CryptoKey> {
    try {
      // Convert IV from hex string to buffer
      const ivBuffer = new Uint8Array(
        iv.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
      );

      // Convert encrypted private key from hex string to buffer
      const encryptedBuffer = new Uint8Array(
        encryptedPrivateKey
          .match(/.{1,2}/g)
          ?.map((byte) => parseInt(byte, 16)) || []
      );

      // Add password to decryption process
      const enc = new TextEncoder();
      const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        enc.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
      );

      // Derive the key from the password
      const key = await window.crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: enc.encode('salt'), // Same hardcoded salt as on the backend
          iterations: 100000, // Match the iteration count with backend
          hash: 'SHA-256', // Use the same hash algorithm as on the backend
        },
        keyMaterial,
        this.aesAlgorithm,
        false,
        ['decrypt']
      );

      // Decrypt the private key
      const decrypted = await window.crypto.subtle.decrypt(
        { name: 'AES-CBC', iv: ivBuffer },
        key,
        encryptedBuffer
      );

      // Convert decrypted private key from PEM format to ArrayBuffer
      const textDecoder = new TextDecoder('utf-8');
      const pemFormattedPrivateKey = textDecoder.decode(decrypted);
      const privateKeyBuffer = pemToBuffer(pemFormattedPrivateKey, true);

      // Import the decrypted private key into the Web Crypto context
      return await window.crypto.subtle.importKey(
        'pkcs8',
        privateKeyBuffer,
        this.rsaAlgorithm,
        false,
        ['decrypt']
      );
    } catch (error) {
      throw this.handleError('decryptPrivateKey', error);
    }
  }

  async decryptSymmetricKeyWithPrivateKey(
    encryptedSymmetricKeyBase64: string,
    decryptedPrivateKey: CryptoKey
  ): Promise<CryptoKey> {
    try {
      // Base64 encryted - symmetric key
      const encryptedSymmetricKeyBuffer = base64ToArrayBuffer(
        encryptedSymmetricKeyBase64
      );

      // CryptoKey - private key
      const decryptedSymmetricKeyBuffer = await window.crypto.subtle.decrypt(
        { name: 'RSA-OAEP' },
        decryptedPrivateKey,
        encryptedSymmetricKeyBuffer
      );

      const decryptedSymmetricKeyInContext =
        await window.crypto.subtle.importKey(
          'raw',
          decryptedSymmetricKeyBuffer,
          this.aesAlgorithm,
          true,
          ['decrypt']
        );

      return decryptedSymmetricKeyInContext;
    } catch (error) {
      throw this.handleError('decryptSymmetricKeyWithPrivateKey', error);
    }
  }

  async encryptSymmetricKeyWithPublicKey(
    symmetricKey: CryptoKey,
    publicKeyPem: string
  ): Promise<string> {
    try {
      console.log(publicKeyPem);
      // Convert the PEM formatted public key to an ArrayBuffer
      // binary - public key
      const publicKeyBuffer = pemToBuffer(publicKeyPem, false);

      // Import the public key into the crypto context
      // CryptoKey - public key
      const publicKey = await window.crypto.subtle.importKey(
        'spki',
        publicKeyBuffer,
        this.rsaAlgorithm,
        false, // Public key is not extractable
        ['encrypt']
      );

      // Export the symmetric key as raw binary data
      // binary - symmetric key
      const exportedSymmetricKey = await window.crypto.subtle.exportKey(
        'raw',
        symmetricKey
      );

      // Encrypt the symmetric key with the recipient's public key
      // binary encrypted - symmetric key
      const encryptedSymmetricKey = await window.crypto.subtle.encrypt(
        { name: 'RSA-OAEP' },
        publicKey,
        exportedSymmetricKey
      );

      // Convert the encrypted symmetric key to base64 for transmission
      // base64 encrypted - symmetric key
      const encryptedSymmetricKeyBase64 = bufferToBase64(encryptedSymmetricKey);

      // returns base64 encrypted key
      return encryptedSymmetricKeyBase64;
    } catch (error) {
      throw this.handleError('encryptSymmetricKeyWithPublicKey', error);
    }
  }
}

export default EncryptionKeyManager;
