import { useContext, useEffect, useState } from 'react';
import { Button } from '../../shared/components/buttons/button';
import { AuthWrapper } from '../../shared/components/navigation/libs/auth-wrapper';
import { AuthContext } from '../../shared/contexts/auth.context';
import { ErrorModal } from '../../shared/form/error-modal';
import { SuccessModal } from '../../shared/form/success.modal';
import { useClient } from '../../shared/hooks/client';
import { useTranslate } from '../../shared/hooks/translate.hook';
import { handleErrors } from '../../shared/libs/handle-errors';

export interface ActionButtonProps {
    adId: string;
    data: any;
}

export const SubmitButton = (props: ActionButtonProps) => {
    const { client, error } = useClient();
    const { userData, role, isLoggedIn } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [hasApplied, setHasApplied] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { trans } = useTranslate();

    useEffect(() => {
        if (userData && isLoggedIn) {
            (async () => checkIfUserHasAlreadyApplied())();
        }
    }, [userData]);

    const checkIfUserHasAlreadyApplied = async () => {
        try {
            const adId = props.adId;

            if (!adId) {
                return;
            }

            const response = await client(`/users/job-seeker/has-applied/${adId}`);

            if (!response?.hasApplied) {
                throw new Error('Something went wrong');
            }

            setHasApplied(response?.hasApplied);
        } catch (e) {
            handleErrors(e, error);
        }
    };

    const sendApplication = async () => {
        if (role !== 'job-seeker') {
            setErrorMessage(trans('you.need.to.be.a.job-seeker'));
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

    const submitButton = <Button
        className={'h-px-35 w-px-180'}
        buttonStyle={'secondary'}
        onClick={() => sendApplication()}
    >
        <div>
            <span className={'fs-15 color--light'}>Send application</span>
        </div>
    </Button>;

    const alreadySubmittedComponent = <Button
        className={'h-px-35 w-px-180'}
        buttonStyle={'transparent'}
        disabled={true}
    >
        <div>
            <span className={'fs-15 color--light'}>Already applied</span>
        </div>
    </Button>;

    return <div className={''}>
        <AuthWrapper>
            {hasApplied ? alreadySubmittedComponent : submitButton}
        </AuthWrapper>

        <SuccessModal
            successMessage={message}
            show={!!message}
            onClick={(message) => manageSuccess(message)}
        />

        <ErrorModal show={!!errorMessage} onClick={(value) => setErrorMessage(value)} errorMessage={errorMessage}/>
    </div>;
};
