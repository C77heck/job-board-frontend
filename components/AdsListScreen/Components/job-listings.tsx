import { JobCard } from "./job-card";

export interface Job {
    id?: string;
    _id?: string;
    title?: string;
    description?: string;
    expiresOn?: string;
    location?: string;
    salary?: string;
    logo?: string;
    analytics: {
        viewed: number;
        appliedFor: number;
        standard: number;
        featured: number;
        premium: number;
    };
}

interface JobListingsProp {
    jobs: Job[];
    editable?: boolean;
}

export const JobListings = (props: JobListingsProp) => {

    return <div className={'w-px-800 box-shadow'}>
        {(props.jobs || []).map((job, index) => <JobCard
            key={job._id}
            className={props.jobs.length - 1 > index ? 'border-bottom-none' : ''}
            {...job}
        />)}
    </div>;
};
