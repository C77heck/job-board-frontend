import { useState } from 'react';
import { useClient } from './client';

export const useSession = () => {
    const [sessionId, setSessionId] = useState('');
    const { client, error } = useClient();

    const setNewSessionId = (id: string) => {
        setSessionId(id);
    };

    const sendViewEvent = async (sessionId: string, adId: string) => {
        try {
            const response = await client(`/ads/add-view`, 'POST', { body: { sessionId, adId } });

            console.log({ response });
        } catch (e) {
            console.log({ e, error });
        }
    };

    return { sessionId, setNewSessionId, sendViewEvent };
};
