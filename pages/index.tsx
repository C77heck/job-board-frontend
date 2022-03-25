import type { NextPage } from 'next';
import { BaseLayout } from '../shared/layouts/base.layout';

const Home: NextPage = () => {
    return <BaseLayout auth={false} meta={{ title: 'home page', keywords: 'whatever', description: 'some description' }}>
        <h1> its my home page</h1>
    </BaseLayout>;
};

export default Home;
