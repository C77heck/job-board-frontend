import { NextPage } from 'next';
import { JobSeekerHeader } from '../../components/JobSeekerProfileScreen/Components/job-seeker.header';
import { UserData } from '../../components/JobSeekerProfileScreen/Components/user.data';
import { BaseLayoutWidth } from '../../shared/layouts/base-layout-width';
import { BaseLayout } from '../../shared/layouts/base.layout';

const JobSeekerProfile: NextPage = (props: any) => {

    return <BaseLayout
        auth={false}
        meta={{ title: 'home page', keywords: 'whatever', description: 'some description' }}
        className={'flex-column'}
    >
        <JobSeekerHeader>
            <h2>My profile</h2>
        </JobSeekerHeader>
        <BaseLayoutWidth>
            <UserData/>
        </BaseLayoutWidth>
    </BaseLayout>;
};

export default JobSeekerProfile;
