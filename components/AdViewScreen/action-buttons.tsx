import { Button } from '../../shared/components/buttons/button';
import { EnvelopeIcon, FavouriteIcon } from '../../shared/components/icons/icons';

export const ActionButtons = (props: any) => {
    // TODO -> needs icons!!
    return <div className={'row'}>
        <div className={'col-33 display-flex justify-content-start'}>
            <Button className={'h-px-35'} buttonStyle={'border'}>
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
            <Button className={'h-px-35'} buttonStyle={'border'}>
                <div className={'w-100 position-center position-relative'}>
                    <FavouriteIcon className={'position-absolute left-16 position-center color--dark-1'} width={17}/>
                    <span className={'ml-16'}>Save</span>
                </div>
            </Button>
        </div>
    </div>;
};
