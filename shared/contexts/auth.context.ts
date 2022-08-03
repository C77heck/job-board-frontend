import { createContext } from 'react';
import { UserData, UserProps } from '../hooks/auth-hook';

export type UserType = 'recruiter' | 'job-seeker';
export const AuthContext = createContext({
    userId: '',
    token: '',
    isLoggedIn: false,
    type: '',
    userData: {} as UserData,
    whoami: (type: UserType) => {
    },
    signin: (data: UserProps) => {
    },
    signout: () => {
    },
});
