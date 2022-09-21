import { useContext, useEffect, useState } from 'react';
import { Button } from '../../shared/components/buttons/button';
import { FavouriteIcon } from '../../shared/components/icons/icons';
import { AuthWrapper } from '../../shared/components/navigation/libs/auth-wrapper';
import { AuthContext } from '../../shared/contexts/auth.context';
import { SuccessModal } from '../../shared/form/success.modal';
import { useClient } from '../../shared/hooks/client';
import { handleErrors } from '../../shared/libs/handle-errors';
import { ActionButtonProps } from './action-buttons';

export const FavouritesButton = (props: ActionButtonProps) => {
    const { client, error, setHeader } = useClient();
    const { userData, role } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        setIsFavourite(!!(userData?.favourites || []).find((favourites: any) => favourites?.id.toString() === props.adId));
    }, [userData]);

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

    return <div className={''}>
        <AuthWrapper>
            <Button
                onClick={() => manageFavourites()}
                className={'h-px-35 w-px-141'}
                buttonStyle={isFavourite ? 'border-grey' : 'border'}
            >
                <div className={'position-center position-relative w-px-130'}>
                    <FavouriteIcon className={'position-absolute left-16 position-center color--dark-1'} width={17}/>
                    <span className={'ml-16'}>{isFavourite ? 'Saved' : 'Save'}</span>
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
