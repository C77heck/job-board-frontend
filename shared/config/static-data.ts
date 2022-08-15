export const folder = {
    recruiter: 'recruiter',
    'job-seeker': 'job-seeker'
};
export const staticData = {
    commonLinks: {
        home: '/',
        adsList: '/ads-list',
        adView: '/ad-view',
    },
    employerLinks: {
        employerProfile: `/${folder.recruiter}/employer-profile`,
        //favourites: `/${folder.recruiter}/favourites`, // TODO -> We should have this as part of our facebook kind of dev.
        adEdit: `/${folder.recruiter}/ad-edit`,
    },
    jobSeekerLinks: {
        favourites: `/${folder?.['job-seeker']}/favourites`,
        jobSeekerProfile: `/${folder?.['job-seeker']}/job-seeker-profile`,
    },
};

export const getLinks = () => {
    const { jobSeekerLinks, employerLinks, commonLinks } = staticData;
    return { ...jobSeekerLinks, ...employerLinks, ...commonLinks };
};
