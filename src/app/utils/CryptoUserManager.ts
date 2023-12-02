class CryptoUserManager {
  protected readonly aesAlgorithm = { name: 'AES-CBC', length: 256 };
  protected readonly rsaAlgorithm = {
    name: 'RSA-OAEP',
    hash: { name: 'SHA-256' },
  };

  protected handleError(methodName: string, error: any): Error {
    console.error(`${methodName} failed:`, error);
    return new Error(
      `${methodName} error: ${error.message || error.toString()}`
    );
  }

  // No need to return iv for this one as it's sent encrypted
  async generateSymmetricKey(): Promise<CryptoKey> {
    const key = await window.crypto.subtle.generateKey(
      this.aesAlgorithm,
      true,
      ['encrypt', 'decrypt']
    );
    return key;
  }
}

export default CryptoUserManager;
