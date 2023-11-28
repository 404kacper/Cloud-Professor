import React, { useContext } from 'react';
import styles from './AuthForm.module.scss';
import SplineContext from '@/splineContext/SplineContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

export default function AuthForm() {
  const { heroButtonClicked, isLoginScreen, isRegisterScreen } =
    useContext(SplineContext);
  return (
    <div className={styles.container}>
      {/* heroButtonClicked will switch 1st then after 1.1s showModal will change to true - creates time for animation before removing elements from DOM */}
      <div
        className={`${styles.modal} ${
          !heroButtonClicked && styles.animateExit
        }`}
      >
        {isLoginScreen && <LoginForm />}
        {isRegisterScreen && <RegisterForm />}
      </div>
    </div>
  );
}
