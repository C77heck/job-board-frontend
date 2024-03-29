import { JobCard } from "./job-card";

export interface Job {
    id?: string;
    _id?: string;
    title?: string;
    description?: string;
    expiresOn?: string;
    location?: string;
    salary?: string;
    images?: string[];
    logo?: string;
    jobType?: string;
    industryType?: string;
    isPremium?: string;
    analytics?: {
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
    const jobs = (props.jobs || []);

    if (!jobs?.length) {
        return <div className={'position-center'}>
            <span className={'fs-25'}>Sorry, no results were found</span>
        </div>;
    }

    return <div className={'w-px-800 box-shadow'}>
        {jobs.map((job, index) => <JobCard
            key={job._id}
            className={props.jobs.length - 1 > index ? 'border-bottom-none' : ''}
            {...job}
        />)}
    </div>;
};
