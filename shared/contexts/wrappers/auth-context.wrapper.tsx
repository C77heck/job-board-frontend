import { AuthContext } from '../auth.context';
import { useAuth } from '../../hooks/auth-hook';

export const AuthContextWrapper = (props: any) => {
    const auth = useAuth();

    return <AuthContext.Provider value={auth}>
        {props.children}
    </AuthContext.Provider>;
};
