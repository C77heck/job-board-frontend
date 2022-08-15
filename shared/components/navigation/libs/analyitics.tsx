import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/auth.context';
import { SessionContext } from '../../../contexts/session.context';
import { useClient } from '../../../hooks/client';
import { Storage } from '../../../libs/storage';

export const Analyitics = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const { sessionId, setNewSessionId } = useContext(SessionContext);
    const storage = new Storage('sessionId');
    const { client, error, } = useClient();

    const getSessionId = async () => {
        try {
            if (storage.get()) {
                return;
            }

            const response = await client('/analytics');

            setNewSessionId(response.sessionId);
            storage.set(response.sessionId);
        } catch (e) {
            console.log(e, error);
        }
    };

    useEffect(() => {
        if (!isLoggedIn && !sessionId) {
            (async () => await getSessionId())();
        }
    }, [isLoggedIn, sessionId]);

    return null;
};
