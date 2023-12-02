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
  const { fetchKeys, publicKey, privateKey, iv } = useContext(KeysContext);
  // temp vars for testing - simulates current user's public key & entered password
  // straight from the database - hardcoded
  // const publicKeyPem = `-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5f3LNxmtGjSYZRuOpJYUI22mncyOQE9/Zy2I9/ukAJ/9E+YR1aQz/JO6u7MlTk7QSZ9Z9tgQVV04dZ3zZZQq2h3NsX5FFTG+gsdySSd2BxsI1/3yvxLIcd7BbY8rV+IkDYuI8kkkvJr4qe1x0+Pdk9q0D6vekPA68yJaql0TsJEnCtmSrj7UQftEsQLEFMAziTvd/oKBXSYe/i0pXlxA9Dd9P2BmnScDsoCt7VPLVHvtlXr1IR3H8wNhKjEnnPmj3HRIh0+b3dvNrp8ZCpjSZwNqh9R9TQUe1rZm9Y6PQw/BxitXIIWZbYAjqVulJtb5nPlO4C6nLp8/lqhTeCIbbQIDAQAB-----END PUBLIC KEY-----`;
  // straight from the database - hardcoded
  const privateKeyEncrypted = `c66f1f67fb8e772926c36862c88d3b1d11729f165b1355f93dc605aa6a64e481dcf12746c792ad42277d048af4bc2b80fb83f922c908137aa7c141c838ca9ea0f0f7e4735fcf1bec8240aeab7414387cd4828ab019740afbd7d38940c16d4b52a91bde71fd35da40fa6f856bf3093d9dd6f031da7ba659fd6c24f6675f471449b509b072f05a4dbd5f592ea933825e4748e9bc1ad431c8052c32ff506e132317232ce24779e91d897beca2f75b9564077483964026ebf3a5ea52332062258c1dc11801da118bf3e4e7b1ec276a57ce0321293bf571e857d2a33adc1b98a06ceef965cab108ae8d415baf84a64f35702f01f1bdc9316024f85802b82b75e1cc2c2c7723da952010b589d3b4c2ddb9ba24a30e64dfedee39416fa663051c049ebf632c8a472c5fd958f7652998f2236888326fe9993e30ca87e72a3676864898bb8b544b3759e68649909662201a64d458f26ee7ac65870eb764289f5cf72e91083cfe99a05a00fab9f7e80262a17e67e20353a46fcb24f57e06d0b926a510a92a6e26947e0d444ff8ca80cd355a27f6e362a00303d1ce2d39c42ef2fc98cfde9acd2d9e81e52b6a29c33d0dc676a9ed4e19f18cf44c2f4f47f014bd60b78d80f07f650d28944958cc10454bcba0db970d90146b5ed8f0fc158046e90a7ffd8507d102f9c7d11a37f6236e1aaa5be806a3c7a2735c3796e922cb77826b162b2eeed2d6ef40749fdc342901d2c41c8914daa15119e496e00bc4f2fe348db6a11fcd4a9abab32ddf2e77b3c947004bb25a041ab945142dcf0e63a788b87c98946a81465730b1f45a89469a102f149b52d76549293e95dccb88f795a97b5766a6e7f692609a5fd8517c5832497fa5baaa8460d47817216b5f25f99bf1d5e89e782515b013a612d38bbe8889b2563285bbd026bb30b97894cd8c55a24e538cd0fec23bf1fd6553eb22f88b5ce1b7f0e574e48fbd03c52f5f09da75f9f44ec725a920b424a39933aa406c464736ab44d58834aa5946e593f8bb5234e1f21b5953729fad521fa24e81ed53ca97e3e183e58786b483b2a99aafaea534f0ee43770721ac0b2771dd12db27722acc0fa4a66aea4ffa7834bc293d81ed1a30ae181cc4876d787f554f84f41a397f3f858f34334cc8568b3046a881234d051099cb7564ed4e71255e5cd7c46a9aa30942bc37c304d706780b98411b77780483e3cc42321e0ee918c048a3ffa26c5d7600a36c76ceb10f8e5caf816c4ee14fcfa90be8224e3e55a5c2612ce2bb9afcdd988d5146452b4902ba8f560fc3553e34631675b06946c499e0e8bd323c6a60f0523e1b9c75a3d4f7b45aed7bed5769c6b2904b27ce44e0de20cf617804b2ad6747cd003db0cc97277a06d96b01cee26aea78cdb2141d3f9f1c972737f6cf49e6bbad4e54025a79567c547e9e8f85eef0781446d02cb317847b7476ac14139806ad33ec7a33197e0806f8ea8afe40684d672c413b94329cf14b577ea4a5e868323130bc49b093dafc21f1c5d4ed483b6b3312535441a6db86cdefe14ee70fff31edafed5f471e001e33961c2358c4c654f23b33b8fd4d438125971b07ecec41a27a1ba2e57b8c16a66943cc19dae83226e1c89e5a08ad330df8590b2d5f755f687907347900335bc5a1f9066147a0d651a180233fac3d1f81896583f94e0adc0f002cb77cc29861f82006755bc1bf272a6a1b6d5082d230aaeb55ee2cb4a6c72222a0fc28c19f72c1ad6428019ed89a658f5e646cc946b8e01506d86a5f1e654f2251a6bdd14c941c7ead7cd09dc3f2a45646ebcd57413ae62563b94cdbd0b7453e6dc76cb87bd08c34c6278e6a9dc6bb1d276f1b2930549150f5a6c60e2e1d102dca4580760b1fa5cce33c03f0f41540c15f0ccdbc7cf51fcb52b8f66ac58145d5255a9e4cd202289fd26fabec5d1b2db86fe83a87c7c0e940a9a8db4a9c4d0eb0c227582fa1b7e8be96e64bd7f5516e8caf2e54a0c55e9e1566b97be878e8cf464bfc82aa8c23d32d29ec298329241722c68b5c3c8a1dc9c389f5ffb82ca349b2b0c531bd02e2b260d2b4483e02103e4e7e863d636f80a9b42c9079425abf5dd3b91686f0a1f1d971b4b198edd98ccb19e9c08011c35d2fa2df632e099975f0ea9cdfc201654d1361db8bd4f11bfbb32fc67ed18def41fd13af3c733e2939e45ea12db88d4a3ca9be8ec2ef858f6658ea6f6e741f71f58cbc4639cd8a0bb9f308bd7aff3182e73af15b25c1596f55e1c1f036c5e1e479c8ec443bfc7b68377d36e4d58cb9fb49fefcf6f35f9bd2e5a094c0933e1071c2c520ec27b7c2aa59e9526076f0b60f73dd345de5008c8072c48ce336f55b5acc8d8d84595c1b9746799498d37bb029d4ade2091a846775082f6f7fc2b9e6b26187d047c1dee4fb637f2565337d85cf7c`;
  // straight from the database - hardcoded
  const privateKeyIv = `b2ad3c8910a7cb3f2f355e7d7578ea41`;
  // will be comming from database as well - hardcoded
  let fileIv = '';

  // assigned after decryption of above encrypted private key

  // this cannot be base64 after decryption
  // if it is to be safe it must remain within web crypto context as a CryptoKey
  // thus modify EncryptionKeyManager.privateKeyDecryption() method

  // used in: download process (decrypting symmetric key) - doesn't need to be stored in KeysContext
  let privateKeyDecrypted = ``;

  // assigned after decryption of symmetric key

  // used in: download process (decrypting file data) - doesn't need to be stored in KeysContext
  let symmetricKeyDecrypted: CryptoKey;

  let symmetricKeyGenerated: CryptoKey;
  // hardcoded from postman request
  const masterPassword = 'abrakadabra';

  // will be stored in database to combine file after download
  // used in: upload/download to mark the file type
  let fileExtension = '';

  // Base64 string after encoding the file & uploading (simulates the file after being fetched)
  // comes from db: encrypted file data - doesn't need to be stored in KeysContext
  let fileDataBase64 = '';

  // Managers for the whole encryption process
  const cryptoManager = new CryptoUserManager();
  const encryptionKeyManager = new EncryptionKeyManager();
  const encryptionDataManager = new EncryptionDataManager();

  // This method encrypts file data:
  //  - with generated symmetric key at the component mount
  //  - file is uploaded by the user
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Generate symmetric key for testing and share it in component within same render
    symmetricKeyGenerated = await cryptoManager.generateSymmetricKey();

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
      // Some safety checks
      if (!e.target?.result || !(e.target.result instanceof ArrayBuffer)) {
        console.error('FileReader did not load a valid ArrayBuffer');
        return;
      }

      // Loading the file data into an ArrayBuffer
      const arrayBuffer = e.target.result;

      try {
        console.log(symmetricKeyGenerated)
        // Encrypt the file data with the symmetric key
        const { encryptedDataBase64, ivBase64 } =
          await encryptionDataManager.encryptDataWithSymmetricKey(
            arrayBuffer,
            symmetricKeyGenerated
          );

        // Assign processed data to corresponding values
        fileIv = ivBase64;
        fileDataBase64 = encryptedDataBase64;
      } catch (error) {
        console.error('Error processing file:', error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // This method encrypts & decrypts file data & keys:
  //  - encrypts symmetric key with public key of reciever
  //  - decrypts private key of reciever
  //  - uses decrypted private key to decrypt symmetric key (encrypted in step 1)
  //  - uses decrypted symmetric key to decrypt file data and displays it

  const testFlow = async () => {
    // Encrypt the key with the public key
    const encryptSymmetricKey = async (): Promise<string> => {
      try {
        const encryptedSymmetricKeyBase64 =
          await encryptionKeyManager.encryptSymmetricKeyWithPublicKey(
            symmetricKeyGenerated,
            publicKey
          );
        return encryptedSymmetricKeyBase64;
      } catch (error) {
        console.error('Error encrypting symmetric key:', error);
        throw error;
      }
    };

    // execute above and return the encrypted key in base64
    const encryptedSymKey = await encryptSymmetricKey();

    // decrypted the private key with the master password
    privateKeyDecrypted = await encryptionKeyManager.decryptPrivateKey(
      privateKeyEncrypted,
      privateKeyIv,
      masterPassword
    );

    // decrypt the symmetric key with the private key
    const decryptSymmetricKey = async () => {
      try {
        symmetricKeyDecrypted =
          await encryptionKeyManager.decryptSymmetricKeyWithPrivateKey(
            encryptedSymKey,
            privateKeyDecrypted
          );
      } catch (error) {
        console.error('Error encrypting symmetric key:', error);
        throw error;
      }
    };

    // at this point we have symmetric key that was encrypted with public key and later decrypted with private key
    await decryptSymmetricKey();

    // What remains is to decrypt the file data with the symmetric key
    const decryptedFileData =
      await encryptionDataManager.decryptDataWithSymmetricKey(
        fileDataBase64,
        symmetricKeyDecrypted,
        fileIv
      );

    // // 1st way to display the processed data - non text
    // const blob = new Blob([decryptedFileData], { type: 'image/jpeg' }); // Replace 'image/jpeg' with the correct MIME type
    // const imageUrl = URL.createObjectURL(blob);

    // // This url can be a state variable and used in an <img> tag
    // console.log(`Image URL:`, imageUrl);

    // 2nd way to display the processed data - text
    const textDecoder = new TextDecoder('utf-8');
    const decryptedText = textDecoder.decode(decryptedFileData);
    console.log(`Decrypted file data (as text):`, decryptedText);
  };

  useEffect(() => {
    // redirect if user null in AuthContext provider (naive approach for now)
    if (!user) {
      redirect('/');
    }

    fetchKeys();
  }, []);

  return (
    <>
      <div>Dashboard page</div>
      <input
        type='file'
        id='myFile'
        name='filename'
        onChange={handleFileUpload}
      ></input>
      <button type='button' onClick={testFlow}>
        Run tests
      </button>
    </>
  );
}
