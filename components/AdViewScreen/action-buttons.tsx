import { useState } from 'react';
import { Button } from '../../shared/components/buttons/button';
import { EnvelopeIcon, FavouriteIcon } from '../../shared/components/icons/icons';
import { SuccessModal } from '../../shared/form/success.modal';
import { useAuth } from '../../shared/hooks/auth-hook';
import { useClient } from '../../shared/hooks/client';
import { handleErrors } from '../../shared/libs/handle-errors';

export const ActionButtons = (props: any) => {
    const { client, error } = useClient();
    const { userData, role } = useAuth();
    const [message, setMessage] = useState('');
    const createAlert = async (id: string) => {
        try {
            console.log(id);
            const response = await client(`/ads/create-alert/${id}`, 'PUT', { headers: [['role', role]] });

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

            const endpoint = (userData?.favourites || []).includes(id) ? 'remove-from-favourites' : 'add-to-favourites';

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
            <Button onClick={() => createAlert(props.adId)} className={'h-px-35'} buttonStyle={'border'}>
                <div className={'w-100 position-center position-relative'}>
                    <EnvelopeIcon className={'position-absolute left-6 position-center color--dark-1'} width={14}/>
                    <span className={'ml-16'}>Create alert</span>
                </div>
            </Button>
        </div>
        <div className={'col-33 position-center'}>
            <Button className={'h-px-35 w-px-180'} buttonStyle={'secondary'}>
                <div>
                    <span className={'fs-15 color--light'}>Send application</span>
                </div>
            </Button>
        </div>
        <div className={'col-33 display-flex justify-content-end'}>
            <Button onClick={() => manageFavourites()} className={'h-px-35'} buttonStyle={'border'}>
                <div className={'w-100 position-center position-relative'}>
                    <FavouriteIcon className={'position-absolute left-16 position-center color--dark-1'} width={17}/>
                    <span className={'ml-16'}>Save</span>
                </div>
            </Button>
        </div>
        <SuccessModal
            successMessage={message}
            show={!!message}
            onClick={(message) => manageSuccess(message)}
        />
    </div>;
};
