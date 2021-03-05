import React, { useEffect } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';


const Ads = () => {

    const { sendRequest } = useHttpClient();

    useEffect(() => {

        (async () => {
            const responseData = await sendRequest('http://localhost/api/jobs/read_multiple_ads.php')
            console.log(responseData)
        })()

    }, [])


    return (
        <div>

        </div>
    )
}


export default Ads;