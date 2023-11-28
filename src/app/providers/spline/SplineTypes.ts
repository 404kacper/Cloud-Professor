// types for auth context
export type splineContextType = {
    heroButtonClicked: boolean;
    showModal: boolean;
    isLoginScreen: boolean;
    isRegisterScreen: boolean;
    handleHeroButtonClicked: () => void;
    handleShowModal: () => void;
    handleIsLoginScreen: () => void;
    handleIsRegisterScreen: () => void;
}

// default values for auth context
export const splineContextDefaultValue: splineContextType = {
    heroButtonClicked: false,
    showModal: false,
    isLoginScreen: true,
    isRegisterScreen: false,
    handleHeroButtonClicked: () => {},
    handleShowModal: () => {},
    handleIsLoginScreen: () => {},
    handleIsRegisterScreen: () => {}
}