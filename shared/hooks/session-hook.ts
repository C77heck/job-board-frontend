import { useState } from 'react';
import { handleErrors } from '../libs/handle-errors';
import { useClient } from './client';

export const useSession = () => {
    const [sessionId, setSessionId] = useState('');
    const { client, error } = useClient();

    const setNewSessionId = (id: string) => {
        setSessionId(id);
    };

    const sendViewEvent = async (sessionId: string, adId: string) => {
        try {
            await client(`/users/job-seeker/add-view`, 'POST', { body: { sessionId, adId } });
        } catch (e) {
            handleErrors(e, error );
        }
    };

    return { sessionId, setNewSessionId, sendViewEvent };
};
