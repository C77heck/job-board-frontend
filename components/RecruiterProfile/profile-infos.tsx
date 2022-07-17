import React, { useEffect, useState } from 'react';
import { BoxWrapper } from '../../shared/components/ui-misc/box-wrapper';
import { DataPresenter } from '../../shared/components/ui-misc/data-presenter';
import { useAuth } from '../../shared/hooks/auth-hook';
import { ProfileItem } from '../JobSeekerProfileScreen/libs/user.data.document';
import { RecruiterInfoForm } from './forms/recruiter-info.form';

export const ProfileInfos = (props: any) => {
    const { userData } = useAuth();
    const [formattedUserData, setFormattedUserData] = useState<any[]>([]);

    useEffect(() => {
        if (!!userData) {
            // @ts-ignore
            setFormattedUserData(Object.keys(userData).map((prop: string) => ({ [prop]: userData[prop] || '' })));
        }
    }, [userData]);

    return <BoxWrapper
        content={<RecruiterInfoForm/>}
        className={'h-100'}
        enableEdit={props.enableEdit}
        form={props.form}
    >
        <div className={'row'}>
            {formattedUserData.map((data: ProfileItem) => <DataPresenter key={data.label} label={data.label} data={data.data}/>)}
        </div>
    </BoxWrapper>;
};
