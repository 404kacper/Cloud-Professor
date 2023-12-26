import { useContext, useRef } from 'react';
import styles from './PasswordPromptContent.module.scss';

import Image from 'next/image';
import DataContext from '@/dataContext/DataContext';

export default function PasswordPromptContent({
  onSubmit,
}: {
  onSubmit: () => void;
}) {
  const { downloadMyFile, fileNameToDownload, fileFormatToDownload } =
    useContext(DataContext);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleOnClick = async () => {
    const masterPassword = passwordInputRef.current?.value;
    if (masterPassword) {
      console.log('Downloading file...');
      const fileData = await downloadMyFile(masterPassword);
      console.log('Downloading finished...');
      const blob = new Blob([fileData]);
      const downloadUrl = window.URL.createObjectURL(blob);
      // Download file
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${fileNameToDownload}.${fileFormatToDownload}`; // Set the file name
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      a.remove();
      onSubmit();
    } else {
      // display error message
      console.log(`Error - passsword field is empty`);
    }
  };

  return (
    <div className={styles.setupModalContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.buttonSizingContainer}>
          <div className={styles.subjectContainer}>
            <Image src='/modals/modal-avatar-prompt.png' alt='' fill></Image>
          </div>
          <div className={styles.iconContainer}>
            <Image src='/modals/modal-icon-prompt.svg' alt='' fill></Image>
          </div>
          <div className={styles.titleContainer}>
            <div className={styles.title}>Enter Master Password</div>
            <div className={styles.subtitle}>In order to decrypt the file</div>
          </div>
          <div className={styles.inputsContainer}>
            <div className={styles.inputContainer}>
              <div className={styles.inputIconBg}>
                <div className={styles.inputIcon}>
                  <Image
                    src='/modals/modal-inputIcon-password.svg'
                    alt=''
                    fill
                  ></Image>
                </div>
              </div>
              <input
                type='password'
                className={styles.passwordInput}
                placeholder='Your Super Secret Master Password...'
                ref={passwordInputRef}
              />
            </div>
          </div>
          <div className={styles.submitButton} onClick={handleOnClick}>
            SEND
          </div>
        </div>
      </div>
    </div>
  );
}
