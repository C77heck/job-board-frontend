import React from 'react';

import { NavLink } from 'react-router-dom';

import { Star, Email } from '../../shared/SVG/Icons';

import './AdCard.scss';

const AdCard = props => {
    /* figure a new tag on certain ads */
    const { company_name, location, content, job_title, salary, submitted_at } = props.ad;
    const displayDate = new Date(submitted_at.replace(/-/g, ','));
    console.log(displayDate);

    return (
        <div className='ad'>
            <div className='ad__inner'>

                <div className='ad__midsection'>
                    <h2>{job_title}</h2>
                    <ul>
                        <li>{location}</li>
                        <li>{salary}</li>
                        <li>{company_name}</li>
                        <li>{submitted_at}</li>
                    </ul>
                    <p>{content.substr(0, 300)}...</p>
                </div>
                <div className='ad__image'></div>
                <div className='ad__functions'>
                    <button><Email /> Apply</button>
                    <NavLink to='/job/details'><button>Details</button></NavLink>
                    <button><Star /> Save</button>
                </div>

            </div>
        </div>
    )
}


export default AdCard;