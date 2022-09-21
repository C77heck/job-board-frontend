import { useContext, useEffect, useState } from 'react';
import { Button } from '../../shared/components/buttons/button';
import { AuthWrapper } from '../../shared/components/navigation/libs/auth-wrapper';
import { AuthContext } from '../../shared/contexts/auth.context';
import { SuccessModal } from '../../shared/form/success.modal';
import { useClient } from '../../shared/hooks/client';
import { handleErrors } from '../../shared/libs/handle-errors';

export interface ActionButtonProps {
    adId: string;
    data: any;
}

export const SubmitButton = (props: ActionButtonProps) => {
    const { client, error } = useClient();
    const { userData, role } = useContext(AuthContext);
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    const sendApplication = async () => {
        if (role !== 'job-seeker') {
            return;
        }

        try {
            const adId = props.adId;

            const response = await client(`/users/job-seeker/apply`, 'POST', { body: { adId } });

            if (!response?.message) {
                throw new Error('Something went wrong');
            }

            setMessage(response.message);
        } catch (e) {
            handleErrors(e, error);
        }
    };

    const manageSuccess = (message: string) => {
        setMessage(message);
        window.location.reload();
    };

    return <div className={''}>
        <AuthWrapper>
            <Button
                className={'h-px-35 w-px-180'}
                buttonStyle={'secondary'}
                onClick={() => sendApplication()}
            >
                <div>
                    <span className={'fs-15 color--light'}>Send application</span>
                </div>
            </Button>
        </AuthWrapper>

        <SuccessModal
            successMessage={message}
            show={!!message}
            onClick={(message) => manageSuccess(message)}
        />
    </div>;
};
