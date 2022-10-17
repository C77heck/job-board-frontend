import { useEffect } from 'react';
import { useClient } from '../../../hooks/client.hook';
import { useSessionContext } from '../../../hooks/context-hooks/session-context.hook';
import { handleErrors } from '../../../libs/handle-errors';
import { Storage } from '../../../libs/storage';

export const Analyitics = () => {
    const { sessionId, setNewSessionId } = useSessionContext();
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
            handleErrors(e, error);
        }
    };

    useEffect(() => {
        if (!sessionId) {
            const storedSessionId = storage.get();
            if (storedSessionId) {
                return setNewSessionId(storedSessionId);
            }

            (async () => await getSessionId())();
        }
    }, [sessionId]);

    return null;
};
