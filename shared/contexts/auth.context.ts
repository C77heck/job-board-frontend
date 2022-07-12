import { createContext } from 'react';
import { UserMeta, UserProps } from '../hooks/auth-hook';

export const AuthContext = createContext({
    userId: '',
    token: '',
    isLoggedIn: false,
    isRecruiter: false,
    userData: {} as UserMeta,
    whoami: (userId: string) => {
    },
    signin: (data: UserProps) => {
    },
    signout: () => {
    },
});
