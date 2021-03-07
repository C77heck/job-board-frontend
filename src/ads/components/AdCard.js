import React from 'react';

import { NavLink } from 'react-router-dom';

import { Star, Email } from '../../shared/SVG/Icons';
import compareDates from '../../shared/utility/compareDates';

import './AdCard.scss';

const AdCard = props => {
    /* figure a new tag on certain ads */
    const { company_name, location, content, job_title, salary, submitted_at } = props.ad;

    const adDate = compareDates(submitted_at);



    // deal with the date display as per documentation.
    return (
        <div className='ad'>
            <div className='ad__inner'>

                <div className='ad__midsection'>
                    <NavLink to='/job/details'><h2>{job_title}</h2></NavLink>
                    <ul>
                        <li>{location}</li>
                        <li>£{salary}</li>
                        <li>{company_name}</li>
                        <li>{adDate}</li>
                    </ul>
                    <p>{content.substr(0, 300)}...</p>
                </div>
                <div className='ad__image'></div>
                <div className='ad__functions'>
                    <button className='btn--ad'><Email /> Apply</button>
                    <NavLink to='/job/details'><button className='btn--ad'>Details</button></NavLink>
                    <button className='btn--ad'><Star /> Save</button>
                </div>

            </div>
        </div>
    )
}


export default AdCard;