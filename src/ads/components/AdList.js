import React from 'react';
import AdCard from './AdCard';



const AdList = props => {


    return (
        props.ads.map(i => {
            return <AdCard ad={i} />
        })
    )
}


export default AdList;