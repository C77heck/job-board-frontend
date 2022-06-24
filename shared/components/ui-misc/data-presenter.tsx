import React from 'react';
import { ProfileItem } from '../../../components/JobSeekerProfileScreen/libs/user.data.document';

export interface ProfileDataProps extends ProfileItem {
    key: any;
}

export const DataPresenter = (props: ProfileDataProps) => {
    return <div className={'display-flex flex-column mb-4 my-15'}>
        <span className={'text--small-grey'}>{props.label}:</span>
        <span className={'text--small'}>{props.data}</span>
    </div>;
};
