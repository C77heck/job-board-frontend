import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../shared/contexts/auth.context';
import { UserMeta } from '../../shared/hooks/auth-hook';
import { BoxPresenter } from './box-presenter';

export const ProfileInfos = (props: any) => {
    const { userData } = useContext(AuthContext);
    const [formattedUserData, setFormattedUserData] = useState<any[]>([]);

    useEffect(() => {
        if (!!userData) {
            setFormattedUserData(Object.keys(userData).map((prop: string) => ({ label: prop, data: userData[prop as keyof UserMeta] || '' })));
        }
    }, [userData]);
    // TODO need to seperate this to different boxes.
    return <div className={'row'}>
        <div className={'col-lg-33 col-md-50 col-100'}>
            <BoxPresenter title={'Base infos'} data={formattedUserData}/>
        </div>
    </div>;
};
