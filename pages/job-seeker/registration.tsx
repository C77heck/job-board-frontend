import { NextPage } from 'next';
import * as React from 'react';
import { JobSeekerRegisterForm } from '../../shared/components/navigation/forms/job-seeker-register.form';
import { BaseLayoutWidth } from '../../shared/layouts/base-layout-width';
import { BaseLayout } from '../../shared/layouts/base.layout';

const Registration: NextPage = (props: any) => {

    return <BaseLayout showSearchBar={true} auth={false} meta={{ title: 'jobs', keywords: 'jobs', description: 'jobs' }}>
        <BaseLayoutWidth className={''}>
            <div className={'row position-center mt-220 mb-40'}>
                <h2 className={'fs-40'}>Registration</h2>
            </div>
            <div className={'row position-center mb-50 background-color--light-2 p-40'}>
                <JobSeekerRegisterForm endpoint={`/users/job-seeker/signup`}/>
            </div>
        </BaseLayoutWidth>;
    </BaseLayout>;
};

export default Registration;
