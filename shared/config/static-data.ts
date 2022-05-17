export const folder = {
    recruiter: 'recruiter',
    employee: 'employee'
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
    employeeLinks: {
        favourites: `/${folder.employee}/favourites`,
        jobSeekerProfile: `/${folder.employee}/job-seeker-profile`,
    },
};

export const getLinks = () => {
    const { employeeLinks, employerLinks, commonLinks } = staticData;
    return { ...employeeLinks, ...employerLinks, ...commonLinks };
};
