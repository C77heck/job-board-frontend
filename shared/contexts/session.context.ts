import { createContext } from 'react';

export const SessionContext = createContext({
    sessionId: '',
    setNewSessionId: (id: string) => {
    },
    sendViewEvent: (id?: string) => {
    },
});
