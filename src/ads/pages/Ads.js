import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import AdList from '../components/AdList';


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
            <div className='ads'>
                <div className='ads__category'>

                </div>
                <div className='ads__list'>
                    <AdList ads={ads} />
                </div>
            </div>
        </React.Fragment>
    )
}


export default Ads;