import { createContext } from 'react';
import { UserProps } from '../hooks/auth-hook';

export const AuthContext = createContext({
    userId: '',
    token: '',
    isLoggedIn: false,
    userData: null,
    signin: (data: UserProps) => {
    },
    signout: () => {
    },
});
