import styles from './PasswordPromptContent.module.scss';

import Image from 'next/image';

export default function PasswordPromptContent({
  onSubmit,
}: {
  onSubmit: () => void;
}) {
  return (
    <div className={styles.setupModalContainer}>
      <div className={styles.textArea}>
        <div className={styles.buttonSizingContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              Your Master Password Is Not Set Up
            </div>
            <div className={styles.subtitle}>
              In order to encrypt files you need a master password
            </div>
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
                placeholder='Master Password...'
              />
            </div>
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
                placeholder='Repeat Master Password...'
              />
            </div>

            <div className={styles.alertContainer}>
              <div className={styles.alertIconContainer}>
                <Image
                  src='/modals/modal-alertIcon-password.svg'
                  alt=''
                  fill
                ></Image>
              </div>
              Make sure to remember it!
            </div>
          </div>
          <button className={styles.submitButton} onClick={onSubmit}>
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
