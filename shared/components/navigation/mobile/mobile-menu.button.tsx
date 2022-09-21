import { BarsIcon } from '../../icons/icons';

export const MobileMenuButton = (props: any) => {
    const isActive = props.isActive ? 'color--secondary-3' : 'color-grey';
    return <BarsIcon
        onClick={props.onClick}
        className={`display-flex cursor-pointer h-100 hover-opacity ${isActive}`}
        width={30}
    />;
};
