import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/auth.context';
import { useClient } from '../../../hooks/client';

export const Analyitics = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const { client, error, } = useClient();
    const getSessionId = async () => {
        try {
            const response = await client('/analytics');
            console.log({ response });
        } catch (e) {
            console.log(e, error);
        }
    };

    useEffect(() => {
        (async () => await getSessionId())();

        if (!isLoggedIn) {
            (async () => await getSessionId())();
            console.log('get session id');
        }
    }, [isLoggedIn]);

    return null;
};
