import React from 'react';
import { EditIcon } from '../../../shared/components/icons/icons';
import { Modal } from '../../../shared/components/modal/modal';
import { SafeUserData } from '../libs/user.data.document';
import { ProfileBoxForm } from './forms/profile-box.form';

interface BoxWrapperProps {
    children: any;
    className?: string;
    enableEdit?: boolean;
    form?: SafeUserData;
}

export class BoxWrapper extends React.Component<BoxWrapperProps, any> {
    public onClickHandler() {
        console.log('onClickHandler');
    }

    public renderModalContent() {
        return <ProfileBoxForm data={this.props.form}/>;
    }

    public renderEdit() {
        return <div onClick={() => this.onClickHandler()} className={'display-flex justify-content-end'}>
            <Modal
                level={2}
                className={'border-radius-px-5 p-15'}
                content={this.renderModalContent()}
                size={{ sm: 90, md: 67, lg: 50, xl: 40 }}
                header={<h2 className={'header--3 text-align-center'}>Update profile data</h2>}
                wrapperClass={''}
                trigger={<EditIcon className={'hover-opacity'} width={20}/>}
            />
        </div>;
    }

    public render() {
        return <div className={`border-radius-px-8 p-25 background-color--light-1 ${this.props.className} position-relative`}>
            {this.renderEdit()}
            {this.props.children}
        </div>;
    }
}
