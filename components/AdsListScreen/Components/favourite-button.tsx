import { useEffect, useState } from 'react';
import { Button } from '../../../shared/components/buttons/button';
import { FavouriteFullIcon, FavouriteIcon } from '../../../shared/components/icons/icons';
import { SuccessModal } from '../../../shared/form/success.modal';
import { useClient } from '../../../shared/hooks/client.hook';
import { useAuthContext } from '../../../shared/hooks/context-hooks/auth-context.hook';
import { handleErrors } from '../../../shared/libs/handle-errors';

export const FavouriteButton = (props: { id?: string }) => {
    const { client, error, setHeader } = useClient();
    const { userData, role } = useAuthContext();
    const [message, setMessage] = useState('');
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        setIsFavourite(!!(userData?.favourites || []).find((favourites: any) => favourites?.id.toString() === props.id));
    }, [userData]);

    const manageFavourites = async () => {
        try {
            const id = props.id;

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
        setIsFavourite(!isFavourite);
    };

    return <>
        <Button
            onClick={() => manageFavourites()}
            buttonStyle={'transparent'}
        >
            {isFavourite
                ? <FavouriteFullIcon width={26} className={'color--secondary-1 hover-opacity'}/>
                : <FavouriteIcon width={25} className={'color--dark-2 hover-primary'}/>}
        </Button>
        <SuccessModal
            successMessage={message}
            show={!!message}
            onClick={(message) => manageSuccess(message)}
        />
    </>;
};
