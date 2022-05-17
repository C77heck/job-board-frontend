import moment from 'moment';
import { useEffect, useState } from 'react';
import { redirect } from '../libs/helpers';
import { Storage } from '../libs/storage';

export interface UserMeta {
    firstName: string;
    lastName: string;
    email: string;
}

export interface UserProps {
    userId: string;
    token: string;
    expiry: Date;
    meta: UserMeta;
}

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState<UserMeta | null>(null);
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
        setUserData(userData.meta);
        setIsLoggedIn(true);
        storage.set({ token: userData.token, userId: userData.userId, expiry: userData.expiry });
    };

    return { isLoggedIn, token, userId, userData, signout, signin };
};
