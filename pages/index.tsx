import type { NextPage } from 'next';
import { Header } from '../components/HomeScreen/Components/header';
import Search from '../components/HomeScreen/Components/search';
import { BaseLayout } from '../shared/layouts/base.layout';

const Home: NextPage = () => {

    return <BaseLayout auth={false} meta={{ title: 'home page', keywords: 'whatever', description: 'some description' }}>
        <Header><Search/></Header>
    </BaseLayout>;
};

export default Home;
