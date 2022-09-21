import { CreateAlertButton } from './create-alert.button';
import { FavouritesButton } from './favourites.button';
import { SubmitButton } from './submit.button';

export interface ActionButtonProps {
    adId: string;
    data: any;
}

export const ActionButtons = (props: ActionButtonProps) => {
    return <div className={'row'}>
        <div className={'col-33 display-flex justify-content-start'}>
            <CreateAlertButton {...props} />
        </div>
        <div className={'col-33 position-center'}>
            <SubmitButton {...props} />
        </div>
        <div className={'col-33 display-flex justify-content-end'}>
            <FavouritesButton {...props} />
        </div>
    </div>;
};
