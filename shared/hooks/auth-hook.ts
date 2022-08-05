import moment from 'moment';
import { useEffect, useState } from 'react';
import { UserType } from '../contexts/auth.context';
import { redirect } from '../libs/helpers';
import { Repository } from '../libs/repository';
import { Storage } from '../libs/storage';

export interface UserData {
    first_name: string;
    last_name: string;
    email: string;
    description: string;
    images: string;
    meta: any;
    logo: string;
    company?: CompanyData;
}

export interface CompanyData {
    name: string;
    address: string;
    email: string;
    description: string;
}

export interface UserProps extends UserData {
    userId: string;
    token: string;
    expiry: Date;
    type: UserType;
}

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState<UserData | null>(null);
    const [userId, setUserId] = useState('');
    const [type, setType] = useState('');
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
        setIsLoggedIn(true);
        setType(userData.type);
        storage.set({ token: userData.token, userId: userData.userId, expiry: userData.expiry, type: userData.type });
    };

    const getEndpoint = (type: UserType) => {
        switch (type) {
            case 'recruiter':
                return '/users/recruiter/whoami';
            case 'job-seeker':
                return '/users/job-seeker/whoami';
            default:
                throw new Error('No user type provided');
        }
    };

    const whoami = async (type: UserType) => {
        try {
            const endpoint = getEndpoint(type);
            const request = new Repository(token, 'api');
            const response = await request.fetch(endpoint, 'GET');

            setUserData(response.userData);
        } catch (e: any) {
            signout();
        }
    };

    return { isLoggedIn, token, userId, userData, type, whoami, signout, signin };
};
