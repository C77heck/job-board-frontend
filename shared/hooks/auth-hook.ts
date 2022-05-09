import moment from 'moment';
import { useEffect, useState } from 'react';
import { redirect } from '../libs/helpers';
import { Storage } from '../libs/storage';

export interface UserProps {
    userId: string;
    token: string;
    expiry: Date;
}

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const storage = new Storage('auth');

    const hasNotExpired = (data: UserProps) => {
        if (!data?.expiry) {
            return false;
        }

        return moment(data?.expiry).isBefore(moment());
    };

    useEffect(() => {
        const data = storage.get();
        if (isLoggedIn && data && !hasNotExpired(data)) {
            signout();
        }
        if (data && hasNotExpired(data) && !isLoggedIn) {
            signin(data);
        }
    });

    useEffect(() => console.log('HOOK', isLoggedIn), [isLoggedIn]);

    const signout = () => {
        storage.remove();
        setIsLoggedIn(false);
        setToken('');
        setUserId('');
        redirect('/');
    };

    // TODO -> Will need an expiry ddate. make sure to use my own date manager.
    const signin = (userData: UserProps) => {
        setToken(userData?.token);
        setUserId(userData?.userId);
        setIsLoggedIn(true);
        storage.set({ ...userData });
        console.log('got in');
    };

    return { isLoggedIn, token, userId, signout, signin };
};
