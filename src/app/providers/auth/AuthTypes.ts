// types for auth context
export type authContextType = {
    user: any;
    error: any;
    login: (user: any) => void;
    register: (user: any) => void;
}

// default values for auth context
export const authContextDefaultValue: authContextType = {
    user: null,
    error: null,
    login: () => {},
    register: () => {}
}