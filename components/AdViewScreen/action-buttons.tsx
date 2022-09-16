import { useContext, useEffect, useState } from 'react';
import { Button } from '../../shared/components/buttons/button';
import { EnvelopeIcon, FavouriteIcon } from '../../shared/components/icons/icons';
import { AuthWrapper } from '../../shared/components/navigation/libs/auth-wrapper';
import { AuthContext } from '../../shared/contexts/auth.context';
import { SuccessModal } from '../../shared/form/success.modal';
import { useClient } from '../../shared/hooks/client';
import { handleErrors } from '../../shared/libs/handle-errors';

export interface ActionButtonProps {
    adId: string;
    data: any;
}

export const ActionButtons = (props: ActionButtonProps) => {
    const { client, error, setHeader } = useClient();
    const { userData, role } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [isFavourite, setIsFavourite] = useState(false);
    const [hasAlert, setHasAlert] = useState(false);

    useEffect(() => {
        setIsFavourite(!!(userData?.favourites || []).find((favourites: any) => favourites?.id.toString() === props.adId));
    }, [userData]);

    useEffect(() => {
        if (!userData) {
            return;
        }

        setHasAlert(() => {
            switch (role) {
                case 'job-seeker':
                    return !!(props.data?.jobSeekerAlerts || []).filter((item: any) => item.id.toString() === userData.id.toString()).length;
                case 'recruiter':
                    return !!(props.data?.jobSeekerAlerts || []).filter((item: any) => item.id.toString() === userData.id.toString()).length;
                default:
                    return false;
            }
        });
    }, [props.data, userData]);

    const createAlert = async (id: string) => {
        try {
            setHeader(['role', role]);

            const response = await client(`/ads/create-alert/${id}`, 'PUT');

            if (!response?.message) {
                throw new Error('Something went wrong');
            }

            setMessage(response.message);
        } catch (e) {
            handleErrors(e, error);
        }
    };

    const manageFavourites = async () => {
        try {
            const id = props.adId;

            const endpoint = isFavourite ? 'remove-from-favourites' : 'add-to-favourites';

            const response = await client(`/users/${role}/${endpoint}/${id}`, 'PUT');

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

    return <div className={'row'}>
        <div className={'col-33 display-flex justify-content-start'}>
            <AuthWrapper>
                <Button
                    onClick={() => createAlert(props.adId)}
                    className={'h-px-35'}
                    buttonStyle={hasAlert ? 'border-grey' : 'border'}
                >
                    <div className={'w-100 position-center position-relative'}>
                        <EnvelopeIcon className={'position-absolute left-6 position-center color--dark-1'} width={14}/>
                        <span className={'ml-16'}>Create alert</span>
                    </div>
                </Button>
            </AuthWrapper>
        </div>
        <div className={'col-33 position-center'}>
            <Button className={'h-px-35 w-px-180'} buttonStyle={'secondary'}>
                <div>
                    <span className={'fs-15 color--light'}>Send application</span>
                </div>
            </Button>
        </div>
        <div className={'col-33 display-flex justify-content-end'}>
            <AuthWrapper>
                <Button
                    onClick={() => manageFavourites()}
                    className={'h-px-35'}
                    buttonStyle={isFavourite ? 'border-grey' : 'border'}
                >
                    <div className={'w-100 position-center position-relative'}>
                        <FavouriteIcon className={'position-absolute left-16 position-center color--dark-1'} width={17}/>
                        <span className={'ml-16'}>{isFavourite ? 'Saved' : 'Save'}</span>
                    </div>
                </Button>
            </AuthWrapper>
        </div>
        <SuccessModal
            successMessage={message}
            show={!!message}
            onClick={(message) => manageSuccess(message)}
        />
    </div>;
};
