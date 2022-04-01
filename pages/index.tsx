import type { NextPage } from 'next';
import { FreshPostings } from '../components/HomeScreen/Components/fresh-postings';
import { Header } from '../components/HomeScreen/Components/header';
import Search from '../components/HomeScreen/Components/search';
import { BaseLayout } from '../shared/layouts/base.layout';

const dummyPostings = [
    { id: '1', title: 'Chef de partie', description: 'description', location: 'London, Sussex', salary: '3000' },
    { id: '2', title: 'Civil Engineer', description: 'description', location: 'London, South-end-on-sea', salary: '3000' },
    { id: '3', title: 'Commis Chef', description: 'description', location: 'London, Uk, Brighton', salary: '3000' },
    { id: '4', title: 'Shop Assistant', description: 'description', location: 'London, West midlands', salary: '3000' },
    { id: '5', title: 'Food Packer', description: 'description', location: 'London, East Sussex', salary: '3000' },
    { id: '6', title: 'Carpenter', description: 'description', location: 'Birmingham, West Coast', salary: '3000' },
    { id: '7', title: 'Social Worker', description: 'description', location: 'London', salary: '3000' },
];
const Home: NextPage = () => {
    return <BaseLayout auth={false} meta={{ title: 'home page', keywords: 'whatever', description: 'some description' }}>
        <Header>
            <Search/>
            <FreshPostings data={dummyPostings}/>
        </Header>
    </BaseLayout>;
};

export default Home;
