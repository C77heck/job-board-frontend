import { useSession } from '../../hooks/session.hook';
import { SessionContext } from '../session.context';

export const SessionContextWrapper = (props: any) => {
    const session = useSession();

    return <SessionContext.Provider value={session}>
        {props.children}
    </SessionContext.Provider>;
};
