'use client';
import React, { useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import KeysContext from '@/keysContext/KeysContext';
import { redirect } from 'next/navigation';
import CryptoUserManager from '@/utils/CryptoUserManager';
import EncryptionDataManager from '@/utils/subclasses/EncryptionDataManager';
import EncryptionKeyManager from '@/utils/subclasses/EncryptionKeyManager';

export default function Dasbhoard() {
  const { user } = useContext(AuthContext);
  const { fetchKey, privateKey, iv } = useContext(KeysContext);
  // temp vars for testing - simulates current user's public key & entered password
  const publicKeyPem = `-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAltv5N4tglsw/8/1cJTsGo9SuSYTxCXulhvzO5EUioz0T5eO3Qf82kwyASB+tHDkEnaufjY5fInfGAjnSdB+lpgcSRZFcRY6tb+7f8vzbjNGtWn6YZtPjzV/Fv3mgpURzBBDwUWDBbobsi40sI3o9pUXTkBTgVjjEegck0hK5vCP2rzsZ9j1zfHonNbD0aO5/1c0oXuSy+PqtQBTbhw3x8XMatkFevbbt+Lguqx0a9/pz2NbbOIi+Bk+JlkWAqhEWil+iva5NPuM/OeU1qz1kTaQdE6n7YcKTXdSITZ8rjavD9nhu/dtPFlxfR9a2n74h88N7LMH1pNjv9M0gPLP06QIDAQAB-----END PUBLIC KEY-----`;
  const privateKeyPem = `6bdabbafd70c808d617185187fb7b21005c4be81e41c2ff2f68f166c5591e4637231fb803d142f5339152a9b22fd255460f3958d837690df2eb5d343d8e34583c9cd405801005808d3d6d218f0b38b18be7bb5ca4ec6842e6433b287353c7bb659410376ccd74db4c00c1ec0c6036310ffc7ffd09ebb152a54b5ce863b8f8dc3c44a19be657817c6cb4a08e20c7df8bad268cf8e1f7b39cfe9e86ca48b851e8ccf1678d374e8b6a52c34bb69c864e2b073d25ff3e8e2a106b22f7cd6f9a0c97ef0e0c5261609ba4bdeb778d99ce823966caac910ce081e1e2ca8b7068401c5bc084a83915bc4a62e694df16e2b96c0c0dc0e0cd385c83d7be71073b07c53719a348d5a910b87ebda372c23c2221cbeda978165c08731da593541aa49cdbb742cb4e163ca089cbf78cd52166ffab1d0de54e11718b636e0d4027eb7d85f55a4162fc157bece133ebf2b3335643ae53c2f58a00f7df705ce462f511ae34f921dbb7b13e5e097396e2e7117f3dd646372338f989c3be379e98ecf93a79d554d73642a768d66d41e56ce72bc46f3270ddd80390130b06d47002fbca9d77807ebf51ef4be571f7176fa23062b704d4ddc15b8583eef6c88d624b282ccf1f7036f85120e2e4ed78e8233f376403b19877a3f632bc058dc9b3eb8e66196d965b4de5e57fe99a8b65c2a4065ab67086d71c91e9518c421f1ad7c3d369a4b64363f28f6f95eae26771de2d1ff371c5dbee1d12985e3f7c79ac0e87afe09f62af33d5ace179cf99252a74e21d71de57e559a32274a587ec784a89a84fdbfa43f641f4fb479e11ee87d15f89c188971b5c61d238755ee7bc39f85b3e73e0066569b755aae0f1adce1b32933c924e73338dec3cbb578107653715789e9802730900928f02faddc665bcd225421875544ee33cda55ef4ba738484de409b9a2c67f53ebec9a72b124605fe9f90cc11aa654f2b68f151918e54d2a6c35d6a05efd5c1091d573eb7fccd3b40ba57aa18c7f94d10cdf620f6ce1eed6028a09be4d8b012a9b7e50bd373d3951358a0fc71af15c46ff0f7f08daf7dc4f866f064913c2970e21fa20ed9fac7b228709ca44e4648b54b0b5868e3c290f47371cbf9b4ad5a1f48277a3c0db0af9b3efbc3297a33970bf2fa023da905b8de61fbedb9bf557d0babe9733494a0599ebe55dbcbb58258091cd718df713e5b383ef769882676db54b865c5482aa24fcab85aed771f516bf472461b9bd2dbe3660fed615f0d522be79cf7ebe8922c2eabda010eb2e1d723009dd5314aa99809aa89e827010fa2489dfbefe5b339ca3246caca0b001dd396ad7454c5d622eda663a4c3d4dc6e4dcb1641edf4c2dc4bc4e7ab779757a49c5aba27faf0c7152b49668d7a28eed7e07aa520b2a350f6d7d631875fb17a28102ec3e995e2036217b4361e0bcfea66f905b2ab63a9c5709d14f4e121c68a22547ed6f3583c75951feb6054787a45dc57a72e6a083ab5af2dca3c51969b40ab9b90cf05518f0e57553954576a92789b7d993efe54238a29ed88b9e45d2c53c76931a8847958c1eada4660c68a607e141469a51f7c52b5adc4029820af53d7f658c10d2a93d5b251228b4504f151915608a4fc09755d28d54e76459fdef630335d44bfcee4c74e727121d7bc3cfbf2e8c0e31d4a0bd7dd8c9d7351cdd3c8736b9acd06f77d49969f68915fddbef2384dca27ce34305c8bcae3a25a0fc7c049992f3dac936c04010c64ff29b67ab6f6f336f22bcb0b2cd7174507df2fca7e5fd50373ba9f3dd7fba93dc79054b0ef98b9c630501c2815dae98fa593723d35fe3f3ac78f47515919d62831fcd72682c79f08f316b2cc2d1cff775dae2880b7481d65af5b996aa708bbef33150cdd5a9d9e539469c59f66771119279cfff11f638848601fcb1d3282af3bf969cf39a8674ca67c4ff1a5d66ae130317e5d5eff2a08ce0ee652d71362c3c87fe4a3f422a670aec0bf63ada9af79c7efd06a4d2932558314d361418027eab27bf6f2ccdeab76bca76205a81e342791941f6b9aa6785268ccb55bb23bc828ba4f8791001282c080f475c0f3f314c0657f16f2f41db3d7c2339aa33e1d9443c8f7d1a396531b0d9b2394072fcdd3c67a8ebad600414d17a042fe12798bd091f99f9849913c3a3c7f2417d967646892ccc2df31c6c62db6f84b445b233ac9e5fff9cd7327f53abd9f94a76a7fef8931f9ee2af1b7de8bce41690e95e2cdc9982203aa862923e5cc64d01f6c4f64cb260f4eef03733dd91d80b801dc9155cd377276e4868346b570676ded59206129aca9ef781c83073cb57497ed093d2c933a7bf6d8806f2eb2177a5d73d2e5f2e2adaf6efde20552b1142f00c7e299462e46d936be93c8da2fe87fadb1517e8b0efb6e77924da5bc5bd06e43207f451b13cb`;
  const masterPassword = 'abrakadabra';
  let fileExtension = '';
  let fileIvBase64 = '';
  const cryptoManager = new CryptoUserManager();
  const encryptionKeyManager = new EncryptionKeyManager();
  const encryptionDataManager = new EncryptionDataManager();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) {
      return;
    }

    const file = files[0];
    if (!file) {
      return;
    }

    // Extracting file extension - necessary to put the file back together after downloading
    const fileName = file.name;
    fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);

    const reader = new FileReader();

    reader.onload = async (e: ProgressEvent<FileReader>) => {
      if (!e.target?.result || !(e.target.result instanceof ArrayBuffer)) {
        console.error('FileReader did not load a valid ArrayBuffer');
        return;
      }

      const arrayBuffer = e.target.result;

      try {
        const symmetricKey = await cryptoManager.generateSymmetricKey();
        const { encryptedDataBase64, ivBase64 } =
          await encryptionDataManager.encryptDataWithSymmetricKey(
            arrayBuffer,
            symmetricKey
          );

        // Now encrypt the symmetric key with the public key
        const encryptedSymmetricKeyBase64 =
          await encryptionKeyManager.encryptSymmetricKeyWithPublicKey(
            symmetricKey,
            publicKeyPem
          );

        // You now have encrypted data and an encrypted key
        console.log('Encrypted File Data:', encryptedDataBase64);
        console.log('Encrypted Symmetric Key:', encryptedSymmetricKeyBase64);
      } catch (error) {
        console.error('Error processing file:', error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    // redirect if user null in AuthContext provider (naive approach for now)
    if (!user) {
      redirect('/');
    }
    // necessary for below useEffect
    fetchKey();
  }, []);

  useEffect(() => {
    if (privateKey && iv) {
      encryptionKeyManager
        .decryptPrivateKey(privateKey, iv, masterPassword)
        .then((decryptedKey) => {
          // console.log('Decrypted Private Key:', decryptedKey);
        })
        .catch((error) => {
          console.error('Error during decryption:', error);
        });
    }
  }, [privateKey]);

  return (
    <>
      <div>Dashboard page</div>
      <input
        type='file'
        id='myFile'
        name='filename'
        onChange={handleFileUpload}
      ></input>
    </>
  );
}
