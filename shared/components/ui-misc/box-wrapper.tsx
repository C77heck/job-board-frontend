import React from 'react';
import { SafeUserData } from '../../../components/JobSeekerProfileScreen/libs/user.data.document';
import { SafeRecruiterData } from '../../../components/RecruiterProfile/libs/recruiter.data.document';
import { EditIcon } from '../icons/icons';
import { Modal } from '../modal/modal';

interface BoxWrapperProps {
    children: any;
    className?: string;
    enableEdit?: boolean;
    form?: SafeUserData | SafeRecruiterData;
    content: JSX.Element;
}

export class BoxWrapper extends React.Component<BoxWrapperProps, any> {
    public renderEdit() {
        return <div className={'display-flex justify-content-end'}>
            <Modal
                level={2}
                className={'border-radius-px-5 p-15'}
                content={this.props.content}
                size={{ sm: 90, md: 67, lg: 50, xl: 40 }}
                header={<h2 className={'header--3 text-align-center'}>Update profile data</h2>}
                wrapperClass={''}
                trigger={<EditIcon className={'hover-opacity box-wrapper-edit-icon'} width={20}/>}
            />
        </div>;
    }

    public render() {
        return <div className={`border-radius-px-8 p-25 ${this.props.className} position-relative background-color--light-1 box-shadow w-100`}>
            {this.renderEdit()}
            {this.props.children}
        </div>;
    }
}
