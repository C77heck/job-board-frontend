import React from 'react';
import { ProfileItem, SafeUserData } from '../libs/user.data.document';
import { BoxWrapper } from './box-wrapper';
import { ProfileBoxForm } from './forms/profile-box.form';

interface ProfileBoxProps {
    profileItems: any[];
    enableEdit: boolean;
    header: string;
    form: SafeUserData;
}

export class ProfileBox extends React.Component<ProfileBoxProps, any> {
    public renderFirstColumn(items: ProfileItem[]) {
        return <div className={'w-100'}>
            {items.length && items.map(({ label, data }: ProfileItem) => <ProfileDataItem key={`${data}`} data={data} label={label}/>)}
        </div>;
    }

    public renderSecondColumn(items: ProfileItem[]) {
        return <div className={'w-100'}>
            {items.length && items.map(({ label, data }: ProfileItem) => <ProfileDataItem key={`${data}`} data={data} label={label}/>)}
        </div>;
    }

    public getCollumns() {
        const profileItems = (this.props.profileItems || []);
        const mid = Math.ceil(profileItems.length / 2);

        return {
            firstColumns: profileItems.slice(0, mid),
            secondColumns: profileItems.slice(mid)
        };
    }

    public renderModalContent() {
        return <ProfileBoxForm data={this.props.form}/>;
    }

    public render() {
        const { firstColumns, secondColumns } = this.getCollumns();

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

interface ProfileDataProps extends ProfileItem {
    key: any;
}

const ProfileDataItem = (props: ProfileDataProps) => {
    return <div className={'display-flex flex-column mb-4 my-15'}>
        <span className={'text--small-grey'}>{props.label}:</span>
        <span className={'text--small'}>{props.data}</span>
    </div>;
};
