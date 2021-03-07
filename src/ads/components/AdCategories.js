import React, { useEffect, useState } from 'react';
import SearchBar from '../../main/components/SearchBar';

import './AdCategories.scss';


const AdCategories = props => {
    const [location, setLocation] = useState([])

    useEffect(() => {
        // create an array of unique locations
        setLocation(() => {
            const locations = [];

            props.ads.forEach(i => {
                if (!locations.includes(i.location)) {
                    locations.push(i.location)
                }
            })

            return locations;
        })
    }, [props.ads])
    console.log(location)

    // location filtering
    const locationFilterHandler = e => {
        console.log(e.target.id)
    }
    // date filtering
    const dateFilterHandler = e => {
        console.log(e.target.id)
    }
    // salary filtering
    const salaryFilterHandler = e => {
        console.log(e.target.id)
    }
    // job types
    const typeHandler = e => {
        console.log(e.target.id)
    }

    return (
        <div className='filters'>
            <div className='filters__search'>

                <SearchBar className='search--in-filters' />
            </div>
            <div className='filters__sub'>
                <ul>
                    <h4>Locations</h4>
                    {location.map(i => {
                        return (<li
                            key={i}
                            id={i}
                            onClick={locationFilterHandler}
                        >
                            {i}
                        </li>)
                    })}
                </ul>
            </div>

            <div className='filters__sub'>
                <ul>
                    <h4>By date</h4>

                    <li id='today' onClick={dateFilterHandler}>Last 24 hours</li>
                    <li id='three' onClick={dateFilterHandler}>Last 3 days</li>
                    <li id='week' onClick={dateFilterHandler}>Last week</li>
                    <li id='month' onClick={dateFilterHandler}>Last month</li>
                </ul>
            </div>

            <div className='filters__sub'>
                <ul>
                    <h4>By date</h4>

                    <li id='twenty' onClick={salaryFilterHandler}>At least £20000</li>
                    <li id='thirty' onClick={salaryFilterHandler}>At least £30000</li>
                    <li id='fourty' onClick={salaryFilterHandler}>At least £40000</li>
                    <li id='fifty' onClick={salaryFilterHandler}>At least £50000</li>
                    <li id='sixty' onClick={salaryFilterHandler}>At least £60000</li>
                    <li id='seventy' onClick={salaryFilterHandler}>At least £70000</li>

                </ul>
            </div>

            <div className='filters__sub'>
                <ul>
                    <h4>By types</h4>

                    <li id='contract' onClick={typeHandler}>Contract</li>
                    <li id='permament' onClick={typeHandler}>Permament</li>
                    <li id='temporary' onClick={typeHandler}>Temporary</li>
                    <li id='part' onClick={typeHandler}>Part time</li>
                </ul>
            </div>
        </div>
    )
}


export default AdCategories;