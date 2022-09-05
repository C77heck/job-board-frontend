import React from 'react';
import { FavouriteIcon, LocationIcon, MoneyIcon } from '../../shared/components/icons/icons';
import { priceFormat } from '../../shared/libs/helpers';
// TODO -> add icons for the missing bits.
export const SmallAdCard = (props: any) => {
    return <div className={'row small-ad-card hover-scale box-shadow--light'}>
        <div className={'col-100 display-flex justify-content-space-between'}>
            <span className={'fs-13'}>posted when...</span>
            <FavouriteIcon width={15}/>
        </div>
        <div className={'col-100'}>
            <h2 className={'fs-18 color--primary'}>ad title</h2>
        </div>
        <div className={'col-100'}>
            <div className={'display-flex'}>
                <MoneyIcon className={'display-flex align-items-center'} width={10}/>
                <p className={'fs-11 pl-5 text-color--yellow'}>{priceFormat(424321)}</p>
            </div>
        </div>
        <div className={'col-100'}>
            <div className={'display-flex'}>
                <LocationIcon className={'display-flex align-items-center justify-content-start pt-1'} width={9}/>
                <p className={'fs-14 pl-5 text-color--yellow'}>{'London'}</p>
            </div>
        </div>

        <div className={'col-100'}>
            <span></span>
            <p className={'fs-14 pl-5 text-color--yellow'}>{'Company name'}</p>
        </div>
        <div className={'col-100'}>
            <p className={'fs-14 pl-5 text-color--yellow'}>{'job type'}</p>

        </div>
    </div>;
};
