'use client';

import { createContext, useState } from 'react';
import { ReactNode } from 'react';
import { splineContextDefaultValue, splineContextType } from './SplineTypes';

const SplineContext = createContext<splineContextType>(
  splineContextDefaultValue
);

// @todo - refactor to reducers and actions - in order to avoid too many requests causing multiple re-renders
export const SplineProvider = ({ children }: { children: ReactNode }) => {
  const [heroButtonClicked, setHeroButtonClicked] = useState(splineContextDefaultValue.heroButtonClicked);
  const [showModal, setShowModal] = useState(splineContextDefaultValue.showModal);
  const [isLoginScreen, setIsLoginScreen] = useState(splineContextDefaultValue.isLoginScreen);
  const [isRegisterScreen, setIsRegisterScreen] = useState(splineContextDefaultValue.isRegisterScreen);

  const handleHeroButtonClicked = () => {
    setHeroButtonClicked(!heroButtonClicked);
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleIsLoginScreen = () => {
    setIsLoginScreen(!isLoginScreen);
  };

  const handleIsRegisterScreen = () => {
    setIsRegisterScreen(!isRegisterScreen);
  }

  return (
    <SplineContext.Provider
      value={{
        heroButtonClicked,
        showModal,
        isLoginScreen,
        isRegisterScreen,
        handleHeroButtonClicked,
        handleShowModal,
        handleIsLoginScreen,
        handleIsRegisterScreen
      }}
    >
      {children}
    </SplineContext.Provider>
  );
};

export default SplineContext;
