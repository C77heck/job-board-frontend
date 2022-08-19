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
            await client(`/ads/add-view`, 'POST', { body: { sessionId, adId } });
        } catch (e) {
            console.log({ e, error });
        }
    };

    return { sessionId, setNewSessionId, sendViewEvent };
};
