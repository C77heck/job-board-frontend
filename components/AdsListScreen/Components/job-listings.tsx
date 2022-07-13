import { JobCard } from "./job-card";

export interface Job {
    id: string;
    title: string;
    description: string;
    expiresOn: string;
    location: string;
    salary: string;
}

interface JobListingsProp {
    jobs: Job[];
    editable?: boolean;
}

export const JobListings = (props: JobListingsProp) => {

    return <div className={''}>
        {(props.jobs || []).map((job, index) => <JobCard
            editable={props.editable}
            key={job.id}
            className={props.jobs.length - 1 > index ? 'border-bottom-none' : ''}
            {...job}
        />)}
    </div>;
};
