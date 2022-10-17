import { useContext } from 'react';
import { SessionContext } from '../../contexts/session.context';

export const useSessionContext = () => {
    const context = useContext(SessionContext);

    return { ...context };
};
