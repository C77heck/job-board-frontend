import { useContext, useEffect, useState } from 'react';
import { Button } from '../../shared/components/buttons/button';
import { EnvelopeIcon } from '../../shared/components/icons/icons';
import { AuthWrapper } from '../../shared/components/navigation/libs/auth-wrapper';
import { AuthContext } from '../../shared/contexts/auth.context';
import { SuccessModal } from '../../shared/form/success.modal';
import { useClient } from '../../shared/hooks/client';
import { handleErrors } from '../../shared/libs/handle-errors';
import { ActionButtonProps } from './action-buttons';

export const CreateAlertButton = (props: ActionButtonProps) => {
    const { client, error, setHeader } = useClient();
    const { userData, role } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [hasAlert, setHasAlert] = useState(false);

    useEffect(() => {
        if (!userData) {
            return;
        }

        setHasAlert(() => {
            switch (role) {
                case 'job-seeker':
                    return !!(props.data?.jobSeekerAlerts || []).filter((item: any) => item.id.toString() === userData.id.toString()).length;
                case 'recruiter':
                    return !!(props.data?.recruiterAlerts || []).filter((item: any) => item.id.toString() === userData.id.toString()).length;
                default:
                    return false;
            }
        });
    }, [props.data, userData]);

    const manageAlerts = async (id: string) => {
        try {
            setHeader(['role', role]);

            const endpoint = hasAlert ? 'remove-alert' : 'create-alert';

            const response = await client(`/ads/${endpoint}/${id}`, 'PUT');

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
                onClick={() => manageAlerts(props.adId)}
                className={'h-px-35 w-px-141'}
                buttonStyle={hasAlert ? 'border-grey' : 'border'}
            >
                <div className={'position-center position-relative w-px-130'}>
                    <EnvelopeIcon className={'position-absolute left-6 position-center color--dark-1'} width={14}/>
                    <span className={'ml-16'}>{hasAlert ? 'Delete alert' : 'Create alert'}</span>
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
