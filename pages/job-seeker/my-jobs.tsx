import type { NextPage } from 'next';
import { FreshPostings } from '../../components/HomeScreen/Components/fresh-postings';
import { HomeScreenHeader } from '../../components/HomeScreen/Components/home.screen.header';
import Search from '../../components/HomeScreen/Components/search';
import { BaseLayoutWidth } from '../../shared/layouts/base-layout-width';
import { BaseLayout } from '../../shared/layouts/base.layout';

const dummyPostings = [
    { id: '1', title: 'Chef de partie', description: 'description', location: 'London, Sussex', salary: '3000' },
    { id: '2', title: 'Civil Engineer', description: 'description', location: 'London, South-end-on-sea', salary: '3000' },
    { id: '3', title: 'Commis Chef', description: 'description', location: 'London, Uk, Brighton', salary: '3000' },
    { id: '4', title: 'Shop Assistant', description: 'description', location: 'London, West midlands', salary: '3000' },
    { id: '5', title: 'Food Packer', description: 'description', location: 'London, East Sussex', salary: '3000' },
    { id: '6', title: 'Carpenter', description: 'description', location: 'Birmingham, West Coast', salary: '3000' },
    { id: '7', title: 'Social Worker', description: 'description', location: 'London', salary: '3000' },
];

// TODO -> THE IS LOADING TO BE DYNAMIC
const MyJobs: NextPage = () => {
    return <BaseLayout isLoading={false} showSearchBar={true} auth={false} meta={{ title: 'home page', keywords: 'whatever', description: 'some description' }}>
        <HomeScreenHeader>
            <BaseLayoutWidth>
                <Search/>
                <FreshPostings data={dummyPostings}/>
            </BaseLayoutWidth>
        </HomeScreenHeader>
    </BaseLayout>;
};

export default MyJobs;
