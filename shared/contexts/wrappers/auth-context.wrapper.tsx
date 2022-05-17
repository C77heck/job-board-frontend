import { useAuth } from '../../hooks/auth-hook';
import { AuthContext } from '../auth.context';

export const AuthContextWrapper = (props: any) => {
    const auth = useAuth();
    console.log({ wrapper: auth });
    return <AuthContext.Provider value={auth}>
        {props.children}
    </AuthContext.Provider>;
};
