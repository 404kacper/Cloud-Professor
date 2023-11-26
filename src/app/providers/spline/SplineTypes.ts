// types for auth context
export type splineContextType = {
    heroButtonClicked: boolean;
    isLoginScreen: boolean;
    handleHeroButtonClicked: () => void;
    handleIsLoginScreen: () => void;
}

// default values for auth context
export const splineContextDefaultValue: splineContextType = {
    heroButtonClicked: false,
    isLoginScreen: true,
    handleHeroButtonClicked: () => {},
    handleIsLoginScreen: () => {},
}