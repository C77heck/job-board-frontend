import { NextPage } from 'next';
import { BaseLayout } from '../shared/layouts/base.layout';

const EmployerProfile: NextPage = (props: any) => {
    return <BaseLayout auth={false} meta={{ title: 'home page', keywords: 'whatever', description: 'some description' }}>
        <h1 className={'fs-55'}>EmployerProfile</h1>
    </BaseLayout>;
};
export default EmployerProfile;
