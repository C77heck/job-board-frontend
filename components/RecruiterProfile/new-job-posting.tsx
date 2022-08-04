import { JobForm } from './forms/job.form';

export const NewJobPosting = () => {
    return <div className={'w-100 px-30 pt-20 pb-100'}>
        <JobForm endpoint={'/users/recruiter//create-new-ad'} method={'POST'}/>
    </div>;
};
