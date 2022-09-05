import React from 'react';
import { CompanyLogo } from '../AdsListScreen/Components/company-logo';

export const AdDetails = (props: any) => {

    return <div className={'row'}>
        <div className={'col-80'}>
            <div><span>{props.data.location}</span></div>
            <div><span>{props.data.salary}</span></div>
            <div><span>company name</span></div>
            <div><span>job type permament </span></div>
            <div><span>posted how long</span></div>
        </div>
        <div className={'col-20 position-center'}>
            <CompanyLogo src={props.data.logo}/>
        </div>
    </div>;
};
