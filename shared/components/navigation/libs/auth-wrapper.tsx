import * as React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/auth.context';
import { LoginModal } from './login.modal';

export const AuthWrapper = (props: { children: JSX.Element }) => {
    const { isLoggedIn } = useContext(AuthContext);

    if (isLoggedIn) {
        return props.children;
    }

    const clonedChildren = React.cloneElement(props.children, { onClick: null });

    return <LoginModal
        type={'job-seeker'}
        trigger={clonedChildren}
    />;
};
