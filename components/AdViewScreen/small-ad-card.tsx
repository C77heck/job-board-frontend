import React from 'react';
import { BusinessIcon, FavouriteIcon, JobTypeIcon, LocationIcon, MoneyIcon } from '../../shared/components/icons/icons';
import { NavLink } from '../../shared/components/navigation/libs/nav-link';
import { priceFormat } from '../../shared/libs/helpers';
import { getFreshnesByDate } from '../../shared/libs/project-helpers';
// TODO -> _add icons for the missing bits.
export const SmallAdCard = (props: any) => {
    if (!props.data) {
        return null;
    }

    return <NavLink href={`/ad-view/${props.data._id}`}>
        <div className={'row small-ad-card hover-scale box-shadow--light'}>
            <div className={'col-100 py-2 display-flex justify-content-space-between'}>
                <span className={'fs-13'}>{getFreshnesByDate(props.data?.createdAt)}</span>
                <FavouriteIcon width={15}/>
            </div>
            <div className={'col-100 py-2'}>
                <h2 className={'fs-18 color--primary'}>{props.data?.title || ' - '}</h2>
            </div>
            <div className={'col-100 py-2'}>
                <div className={'display-flex'}>
                    <LocationIcon className={'display-flex align-items-center justify-content-start pt-1'} width={9}/>
                    <p className={'fs-14 pl-5 color--yellow'}>{props.data?.location || ' - '}</p>
                </div>
            </div>
            <div className={'col-100 py-2'}>
                <div className={'display-flex'}>
                    <MoneyIcon className={'display-flex align-items-center'} width={10}/>
                    <p className={'fs-11 pl-5 olor--yellow'}>{props.data?.salary && priceFormat(props.data.salary)}</p>
                </div>
            </div>

            {props.data?.company && <div className={'col-100 py-2'}>
                <BusinessIcon width={10}/>
                <p className={'fs-12 pl-5 color--yellow'}>props.data?.company</p>
            </div>}

            {props.data?.jobType && <div className={'col-100 py-2'}>
                <JobTypeIcon width={10}/>
                <p className={'fs-12 pl-5 color--yellow'}>props.data?.jobType</p>
            </div>}
        </div>
    </NavLink>;
};
