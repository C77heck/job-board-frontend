import { useAuth } from '../../hooks/auth-hook';
import { AuthContext } from '../auth.context';

export const AuthContextWrapper = (props: any) => {
    const auth = useAuth();

    return <AuthContext.Provider value={auth}>
        {props.children}
    </AuthContext.Provider>;
};
