import { dummyJobs } from '../../pages/ads-list';
import { JobListings } from '../AdsListScreen/Components/job-listings';

export const PostingsHistory = (props: any) => {
    return <div className={'py-50 w-100 px-30'}>
        <JobListings editable={true} jobs={dummyJobs as any}/>
    </div>;
};
