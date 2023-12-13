import styles from './PasswordPromptContent.module.scss';

import Image from 'next/image';

export default function PasswordPromptContent({
  onSubmit,
}: {
  onSubmit: () => void;
}) {
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
              />
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
