import React, { useContext, useEffect, useState } from 'react';
import { BoxWrapper } from '../../shared/components/ui-misc/box-wrapper';
import { DataPresenter } from '../../shared/components/ui-misc/data-presenter';
import { AuthContext } from '../../shared/contexts/auth.context';
import { UserMeta } from '../../shared/hooks/auth-hook';
import { ProfileItem } from '../JobSeekerProfileScreen/libs/user.data.document';
import { RecruiterInfoForm } from './forms/recruiter-info.form';

export const ProfileInfos = (props: any) => {
    const { userData } = useContext(AuthContext);
    const [formattedUserData, setFormattedUserData] = useState<any[]>([]);

    useEffect(() => {
        console.log(Object.keys(userData), Object.keys(userData).map((prop: string) => ({ label: prop, data: userData[prop as keyof UserMeta] || '' })));
        if (!!userData) {
            setFormattedUserData(Object.keys(userData).map((prop: string) => ({ label: prop, data: userData[prop as keyof UserMeta] || '' })));
        }
    }, [userData]);

    return <BoxWrapper
        content={<RecruiterInfoForm/>}
        className={'h-100'}
        enableEdit={props.enableEdit}
        form={props.form}
    >
        <div className={'row'}>
            {formattedUserData.map((data: ProfileItem) => <DataPresenter className={'col-12'} key={data.label} label={data.label} data={data.data}/>)}
        </div>
    </BoxWrapper>;
};
