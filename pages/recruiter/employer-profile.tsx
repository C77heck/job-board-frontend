import { NextPage } from 'next';
import { NewJobPosting } from '../../components/RecruiterProfile/new-job-posting';
import { Tab, TabViewer } from '../../components/RecruiterProfile/tab-viewer';
import { BaseLayoutWidth } from '../../shared/layouts/base-layout-width';
import { BaseLayout } from '../../shared/layouts/base.layout';

// http://localhost:3000/recruiter/employer-profile
const EmployerProfile: NextPage = (props: any) => {
    const tabs: Tab = {
        tabNames: [
            { display: 'New posting', value: 'new-postings' },
            { display: 'Profile infos', value: 'profile-infos' },
            { display: 'Job postings history', value: 'my-job-postings' }
        ],
        elements: { 'new-postings': <NewJobPosting/>, 'profile-infos': <h2>profile-infos</h2>, 'my-job-postings': <h2>my-job-postings</h2> }
    };
    return <BaseLayout auth={false} meta={{ title: 'home page', keywords: 'whatever', description: 'some description' }}>
        <BaseLayoutWidth className={'min-screen-height justify-content-start pt-150'}>
            <h1 className={'pb-40'}>My profile</h1>
            <TabViewer tabs={tabs}/>
        </BaseLayoutWidth>
    </BaseLayout>;
};
export default EmployerProfile;
