import { NextPage } from 'next';
import { useContext } from 'react';
import { AuthContext } from '../../shared/contexts/auth.context';
import { BaseLayout } from '../../shared/layouts/base.layout';

const JobSeekerProfile: NextPage = (props: any) => {
    const auth = useContext(AuthContext);
    console.log({ auth });
    return <BaseLayout auth={false} meta={{ title: 'home page', keywords: 'whatever', description: 'some description' }}>
        <h1 className={'fs-55'}>JobSeekerProfile</h1>
    </BaseLayout>;
};

export default JobSeekerProfile;
