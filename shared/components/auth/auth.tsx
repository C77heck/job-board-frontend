import { useAuthContext } from '../../hooks/context-hooks/auth-context.hook';
import { ErrorScreen } from './error.screen';

export const Auth = (props: any) => {
    const { isLoggedIn } = useAuthContext();

    return isLoggedIn ? props.children : <ErrorScreen/>;
};
