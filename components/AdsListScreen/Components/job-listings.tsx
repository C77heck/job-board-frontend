import { useState } from 'react';
import { Paginator } from '../../../shared/components/paginator';
import { JobCard } from "./job-card";

export interface Job {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    salary: string;
}

interface JobListingsProp {
    jobs: Job[];
}

export const JobListings = ({ jobs }: JobListingsProp) => {

    return <div className={''}>
        {(jobs || []).map((job, index) => <JobCard
            key={job.id}
            className={jobs.length - 1 > index ? 'border-bottom-none' : ''}
            {...job}
        />)}
    </div>;
};
