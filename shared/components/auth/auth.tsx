import { useContext } from 'react';
import { ErrorScreen } from './error.screen';
import { AuthContext } from '../../contexts/auth.context';

export const Auth = (props: any) => {
    const { isLoggedIn } = useContext(AuthContext);

    return isLoggedIn ? props.children : <ErrorScreen/>;
};
