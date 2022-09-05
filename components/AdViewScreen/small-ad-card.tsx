import React from 'react';
import { FavouriteIcon, LocationIcon, MoneyIcon } from '../../shared/components/icons/icons';
import { priceFormat } from '../../shared/libs/helpers';
// TODO -> add icons for the missing bits.
export const SmallAdCard = (props: any) => {
    return <div className={'row small-ad-card hover-scale box-shadow--light'}>
        <div className={'col-100 display-flex justify-content-space-between'}>
            <span>posted when...</span>
            <FavouriteIcon width={15}/>
        </div>
        <div className={'col-100'}>
            <h2>ad title</h2>
        </div>
        <div className={'col-100'}>
            <div className={'display-flex'}>
                <MoneyIcon className={'display-flex align-items-center'} width={10}/>
                <h2 className={'fs-17 fw--700 pl-8 text-color--yellow'}>{priceFormat(424321)}</h2>
            </div>
        </div>
        <div className={'col-100'}>
            <div className={'display-flex pl-8'}>
                <LocationIcon className={'display-flex align-items-center justify-content-start pt-1'} width={9}/>
                <p className={'fs-15 fw--500 pl-8 text-color--yellow'}>{'London'}</p>
            </div>
        </div>
        <div className={'col-100'}>
            <span>Company name</span>
        </div>
        <div className={'col-100'}>
            <span>
                job type
            </span>
        </div>
    </div>;
};
