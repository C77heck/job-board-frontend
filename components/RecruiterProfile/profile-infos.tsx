import React from 'react';
import { BoxWrapper } from '../../shared/components/ui-misc/box-wrapper';
import { DataPresenter } from '../../shared/components/ui-misc/data-presenter';
import { ProfileItem } from '../JobSeekerProfileScreen/libs/user.data.document';

const dummyUserData = [
    { data: 'something1', label: 'something1' },
    { data: 'something2', label: 'something2' },
    { data: 'something3', label: 'something3' },
    { data: 'something4', label: 'something4' },
    { data: 'something5', label: 'something5' },
    { data: 'something6', label: 'something6' },
];

export class ProfileInfos extends React.Component<any, any> {
    public render() {
        return <BoxWrapper
            content={<div>Some content</div>}
            className={'h-100'}
            enableEdit={this.props.enableEdit}
            form={this.props.form}
        >
            <div className={'row'}>
                {dummyUserData.map((data: ProfileItem) => <DataPresenter key={data.label} label={data.label} data={data.data}/>)}
            </div>
        </BoxWrapper>;
    }
};
