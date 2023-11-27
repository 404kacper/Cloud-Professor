import React, { useContext } from 'react';
import styles from './AuthForm.module.scss';
import SplineContext from '@/splineContext/SplineContext';
import LoginForm from './components/auth/LoginForm';

export default function AuthForm() {
  const { heroButtonClicked, isLoginScreen } = useContext(SplineContext);
  return (
    <div className={styles.container}>
      <div
        className={`${styles.modal} ${
          !heroButtonClicked && styles.animateExit
        }`}
      >
        {isLoginScreen && <LoginForm />}
      </div>
    </div>
  );
}
