import { useState } from 'react';
import { handleErrors } from '../libs/handle-errors';
import { useClient } from './client.hook';

export const useSession = () => {
    const [sessionId, setSessionId] = useState('');
    const { client, error } = useClient();

    const setNewSessionId = (id: string) => {
        setSessionId(id);
    };

    const sendViewEvent = async (sessionId: string, adId: string) => {
        try {
            if (!adId) {
                throw new Error('Missing ad id');
            }

            await client(`/users/job-seeker/add-view`, 'POST', { body: { sessionId, adId } });
        } catch (e) {
            handleErrors(e, error);
        }
    };

    return { sessionId, setNewSessionId, sendViewEvent };
};
