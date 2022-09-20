import React from 'react';
import { SpinnerIcon } from '../icons/icons';

export interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    buttonStyle?: string;
    name?: string;
    id?: string;
    disabled?: boolean;
    onClick?: (e: any) => void;
    title?: string | JSX.Element;
    isLoading?: boolean;
    textColor?: string;
    children?: any;
}

export const Button = (props: ButtonProps) => {
    const width = props.isLoading ? 15 : 0;
    return <button
        type={props.type || 'button'}
        className={`${getButtonType(props.buttonStyle || '')} ${props.className} position-center position-relative`}
        name={props.name}
        id={props.id}
        disabled={props.disabled}
        onClick={props.onClick}
    >
        {props.children ? props.children : <div className={'position-center'}>
            <SpinnerIcon className={'color--light position-absolute left-px-16 top-px-11'} width={width}/>
            <span className={'color--light px-39'}>{props.title}</span>
        </div>}
    </button>;
};

const getButtonType = (type: string) => {
    switch (type) {
        case 'submit':
            return 'button button--submit';
        case 'login':
            return 'button button--login';
        case 'logout':
            return 'button button--logout';
        case 'login--mobile':
            return 'button button--login--mobile';
        case 'logout--mobile':
            return 'button button--logout--mobile';
        case 'success':
            return 'button button--success';
        case 'error':
            return 'button button--error';
        case 'delete':
            return 'button button--delete';
        case 'link':
            return 'button button--link';
        case 'secondary':
            return 'button button--secondary';
        case 'primary':
            return 'button button--primary';
        case 'transparent':
            return 'button button--transparent';
        case 'filter':
            return 'button button--filter';
        case 'filter-buttons':
            return 'button button--filter-buttons';
        case 'navbar-search-button':
            return 'button button--navbar-search';
        case 'border':
            return 'button button--border';
        case 'border-grey':
            return 'button button--border-grey';
        default:
            return 'button';
    }
};
