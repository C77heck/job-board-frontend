import React from 'react';
import { BoxWrapper } from '../../shared/components/ui-misc/box-wrapper';
import { DataPresenter } from '../../shared/components/ui-misc/data-presenter';
import { ProfileItem } from '../JobSeekerProfileScreen/libs/user.data.document';
import { RecruiterInfoForm } from './forms/recruiter-info.form';

export const BoxPresenter = (props: any) => {
    return <BoxWrapper
        content={<RecruiterInfoForm/>}
        className={'h-100'}
        enableEdit={props.enableEdit}
        form={props.form}
    >
        <span className={'fs-18 fw--800'}>{props.title}</span>
        <div className={'row'}>
            {(props.data || []).map((data: ProfileItem) => <DataPresenter className={'col-12'} key={data.label} label={data.label} data={data.data}/>)}
        </div>
    </BoxWrapper>;
};
