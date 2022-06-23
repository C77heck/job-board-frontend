import { NextPage } from 'next';
import { NewJobPosting } from '../../components/RecruiterProfile/new-job-posting';
import { BaseLayoutWidth } from '../../shared/layouts/base-layout-width';
import { BaseLayout } from '../../shared/layouts/base.layout';

// http://localhost:3000/recruiter/employer-profile
const EmployerProfile: NextPage = (props: any) => {
    return <BaseLayout auth={false} meta={{ title: 'home page', keywords: 'whatever', description: 'some description' }}>
        <BaseLayoutWidth>
            <h1>My profile</h1>
            <NewJobPosting/>
        </BaseLayoutWidth>
    </BaseLayout>;
};
export default EmployerProfile;
