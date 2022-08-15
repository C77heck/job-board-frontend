import { useState } from 'react';

export const useSession = () => {
    const [sessionId, setSessionId] = useState('');

    const setNewSessionId = (id: string) => {
        setSessionId(id);
    };

    return { sessionId, setNewSessionId };
};
