import CryptoUserManager from '../CryptoUserManager';
import { bufferToBase64, base64ToArrayBuffer } from '../helpers';

class EncryptionDataManager extends CryptoUserManager {
  async encryptDataWithSymmetricKey(
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

      return {
        encryptedDataBase64: bufferToBase64(encryptedData),
        ivBase64: bufferToBase64(iv),
      };
    } catch (error) {
      throw this.handleError('encryptDataWithSymmetricKey', error);
    }
  }

  async decryptDataWithSymmetricKey(
    encryptedDataBase64: string,
    symmetricKey: CryptoKey,
    ivBase64: string
  ): Promise<ArrayBuffer> {
    try {
      const encryptedData = base64ToArrayBuffer(encryptedDataBase64);
      const iv = base64ToArrayBuffer(ivBase64);

      const decryptedData = await window.crypto.subtle.decrypt(
        { name: 'AES-CBC', iv: new Uint8Array(iv) },
        symmetricKey,
        encryptedData
      );

      return decryptedData;
    } catch (error) {
      throw this.handleError('decryptDataWithSymmetricKey', error);
    }
  }
}

export default EncryptionDataManager;
