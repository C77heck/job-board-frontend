import React from 'react';
import { ProfileBoxForm } from '../../../components/JobSeekerProfileScreen/Components/forms/profile-box.form';
import { ProfileItem } from '../../../components/JobSeekerProfileScreen/libs/user.data.document';
import { SafeRecruiterData } from '../../../components/RecruiterProfile/libs/recruiter.data.document';
import { BoxWrapper } from './box-wrapper';
import { DataPresenter } from './data-presenter';

interface ProfileBoxProps {
    profileItems: any[];
    enableEdit: boolean;
    header: string;
    form: SafeRecruiterData;
}

export class ProfileBox extends React.Component<ProfileBoxProps, any> {
    public renderFirstColumn(items: ProfileItem[]) {
        return <div className={'w-100'}>
            {items.length && items.map(({ label, data }: ProfileItem) => <DataPresenter key={`${data}`} data={data} label={label}/>)}
        </div>;
    }

    public renderSecondColumn(items: ProfileItem[]) {
        return <div className={'w-100'}>
            {items.length && items.map(({ label, data }: ProfileItem) => <DataPresenter key={`${data}`} data={data} label={label}/>)}
        </div>;
    }

    public getCollumns() {
        const profileItems = (this.props.profileItems || []);
        const mid = Math.ceil(profileItems.length / 2);

        return {
            firstColumns: profileItems.slice(0, mid),
            secondColumns: profileItems.slice(mid),
            description: profileItems.slice(mid),
            logo: profileItems.slice(mid),
        };
    }

    public renderModalContent() {
        return <ProfileBoxForm data={this.props.form}/>;
    }

    public render() {
        const { firstColumns, secondColumns, logo, description } = this.getCollumns();

        return <BoxWrapper
            content={this.renderModalContent()}
            className={'h-100'}
            enableEdit={this.props.enableEdit}
            form={this.props.form}
        >
            <h6 className={'fw-700 text--small'}>{this.props.header}</h6>
            <div className={'row'}>
                <div className={'col-50'}>
                    {this.renderFirstColumn(firstColumns)}
                </div>
                <div className={'col-50'}>
                    {this.renderSecondColumn(secondColumns)}
                </div>
            </div>
        </BoxWrapper>;
    }
}
