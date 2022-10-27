import React from 'react';
import { ProfileItem } from '../../../components/JobSeekerProfileScreen/libs/user.data.document';

export interface ProfileDataProps extends ProfileItem {
    key: any;
    className?: string;
}

export const DataPresenter = (props: ProfileDataProps) => {
    return <div key={props.key} className={`display-flex flex-column mb-4 ${props.className}`}>
        <span className={'text--small-grey'}>{props.label}:</span>
        <span className={'text--small'}>{props.data}</span>
    </div>;
};
