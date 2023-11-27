'use client';

import { createContext, useState } from 'react';
import { ReactNode } from 'react';
import { splineContextDefaultValue, splineContextType } from './SplineTypes';

const SplineContext = createContext<splineContextType>(
  splineContextDefaultValue
);

// @todo - refactor to reducers and actions - in order to avoid too many requests causing multiple re-renders
export const SplineProvider = ({ children }: { children: ReactNode }) => {
  const [heroButtonClicked, setHeroButtonClicked] = useState(false);
  const [isLoginScreen, setIsLoginScreen] = useState(false);

  const handleHeroButtonClicked = () => {
    setHeroButtonClicked(!heroButtonClicked);
  };

  const handleIsLoginScreen = () => {
    setIsLoginScreen(!isLoginScreen);
  };

  return (
    <SplineContext.Provider
      value={{
        heroButtonClicked,
        isLoginScreen,
        handleHeroButtonClicked,
        handleIsLoginScreen,
      }}
    >
      {children}
    </SplineContext.Provider>
  );
};

export default SplineContext;
