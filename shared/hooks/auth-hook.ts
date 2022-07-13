import moment from 'moment';
import { useEffect, useState } from 'react';
import { redirect } from '../libs/helpers';
import { Repository } from '../libs/repository';
import { Storage } from '../libs/storage';

export interface UserMeta {
    first_name: string;
    last_name: string;
    email: string;
    description: string;
    images: string;
    meta: string;
    isRecruiter: boolean;
    logo: string;
}

export interface UserProps {
    userId: string;
    token: string;
    expiry: Date;
    meta: UserMeta;
}

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRecruiter, setIsRecruiter] = useState(false);
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

    // useEffect(() => {
    //     if (isLoggedIn && userId && !userData?.first_name) {
    //         console.log('WE ARE HITTING THE USEEFFECT', { userData, userId });
    //         (async () => await whoami(userId))();
    //     }
    // }, [userId]);

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
        storage.set({ token: userData.token, userId: userData.userId, expiry: userData.expiry });
    };

    const whoami = async () => {
        try {
            const request = new Repository(token);
            const userData = await request.fetch('/users/whoami', 'get', {}, {});

            setUserData(userData.meta);
        } catch (e) {
            setUserData(null);
        }
    };

    return { isLoggedIn, token, userId, userData, isRecruiter, whoami, signout, signin };
};
