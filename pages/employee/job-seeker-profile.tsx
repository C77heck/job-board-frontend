import { NextPage } from 'next';
import { BaseLayout } from '../../shared/layouts/base.layout';

const JobSeekerProfile: NextPage = (props: any) => {
    console.log(props);
    return <BaseLayout auth={false} meta={{ title: 'home page', keywords: 'whatever', description: 'some description' }}>
        <h1 className={'fs-55'}>JobSeekerProfile</h1>
    </BaseLayout>;
};

export default JobSeekerProfile;
