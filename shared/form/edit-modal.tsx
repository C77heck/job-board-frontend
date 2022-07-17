import * as React from 'react';
import { useEffect, useState } from 'react';
import { Modal } from '../components/modal/modal';

interface EditModalProps {
    show: boolean;
    title: string;
    content: JSX.Element;
    onClick: (show: boolean) => void;
}

export const EditModal = (props: EditModalProps) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.show);
    });

    const content = <div className={'position-center flex-column'}>
        {props.content && props.content}
    </div>;

    return <Modal
        zIndex={'z-157'}
        portal={'status-modal'}
        level={1}
        overlayClick={(show) => props.onClick(false)}
        className={'border-radius-px-5 p-15 z-100 box-shadow'}
        content={content}
        size={{ sm: 90, md: 75, lg: 65, xl: 50 }}
        header={<h2 className={'header--3 text-color--primary-1 text-align-center'}>{props.title}</h2>}
        show={show}
    />;
};
