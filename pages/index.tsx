import type { NextPage } from 'next';
import { Form } from '../shared/form/form';
import { BaseLayout } from '../shared/layouts/base.layout';

const Home: NextPage = () => {
    return <BaseLayout auth={false} meta={{ title: 'home page', keywords: 'whatever', description: 'some description' }}>
        <h1 className={'fs-55'}> its my home page</h1>

        <Form onSubmit={() => console.log('submitting')} isLoading={false} error={''} clearError={} successMessage={} clearMessage={} client={}>

        </Form>
    </BaseLayout>;
};

export default Home;
