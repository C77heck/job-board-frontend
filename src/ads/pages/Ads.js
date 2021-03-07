import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import AdCategories from '../components/AdCategories';
import AdList from '../components/AdList';

import './Ads.scss';

const Ads = () => {

    const { sendRequest } = useHttpClient();
    const [ads, setAds] = useState([]);
    useEffect(() => {

        (async () => {
            try {
                const responseData = await sendRequest('http://localhost/api/jobs/read_multiple_ads.php')
                setAds(responseData.ads)
                console.log(responseData.ads)
            } catch (err) {

            }

        })()

    }, [])


    return (
        <React.Fragment>
            <h2 className='job-amount'>There are {ads.length} jobs available to apply for</h2>
            <div className='ads'>
                <div className='ads__category'>
                    <AdCategories ads={ads} />
                </div>
                <div className='ads__list'>
                    <AdList ads={ads} />
                </div>
            </div>
        </React.Fragment>
    )
}


export default Ads;