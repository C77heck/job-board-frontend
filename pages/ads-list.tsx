import moment from 'moment';
import { NextPage } from 'next';
import { FilterColumn } from '../components/AdsListScreen/Components/filter-column';
import { JobListings } from '../components/AdsListScreen/Components/job-listings';
import { BaseLayout } from '../shared/layouts/base.layout';
import { priceFormat } from '../shared/libs/helpers';

const dummyJobs = [
    {
        id: '6',
        title: 'Chef de partie',
        salary: priceFormat(3324),
        description: 'Be the first of your friends to declare, \'I love where I work!\' and actually mean it. Laugh hard and work hard with some of the best and brightest in the tech industry. Our client has created the world\'s first marketplace for live experiences by developing the technology that lets anyone create, share and find new things to do. Currently 180 countries host events using their platform, with over 1.5 million events taking place every year and 5 million tickets being processed every month!',
        date: moment().format('YYYY.MM.DD.'),
        location: 'London'
    },
    {
        id: '1',
        title: '.NET Developer, .NET 6, C#, Azure, JavaScript, Agile - London',
        salary: priceFormat(3324),
        description: 'Be the first of your friends to declare, \'I love where I work!\' and actually mean it. Laugh hard and work hard with some of the best and brightest in the tech industry. Our client has created the world\'s first marketplace for live experiences by developing the technology that lets anyone create, share and find new things to do. Currently 180 countries host events using their platform, with over 1.5 million events taking place every year and 5 million tickets being processed every month!',
        date: moment().format('YYYY.MM.DD.'),
        location: 'London'
    },
    {
        id: '2',
        title: 'JavaScript Developer Angular\n',
        salary: priceFormat(3324),
        description: 'Be the first of your friends to declare, \'I love where I work!\' and actually mean it. Laugh hard and work hard with some of the best and brightest in the tech industry. Our client has created the world\'s first marketplace for live experiences by developing the technology that lets anyone create, share and find new things to do. Currently 180 countries host events using their platform, with over 1.5 million events taking place every year and 5 million tickets being processed every month!',
        date: moment().format('YYYY.MM.DD.'),
        location: 'London'
    },
    {
        id: '3',
        title: 'Head chef',
        salary: priceFormat(3324),
        description: 'Be the first of your friends to declare, \'I love where I work!\' and actually mean it. Laugh hard and work hard with some of the best and brightest in the tech industry. Our client has created the world\'s first marketplace for live experiences by developing the technology that lets anyone create, share and find new things to do. Currently 180 countries host events using their platform, with over 1.5 million events taking place every year and 5 million tickets being processed every month!',
        date: moment().format('YYYY.MM.DD.'),
        location: 'London'
    },
    {
        id: '4',
        title: 'Senior Full Stack JavaScript Developer\n',
        salary: priceFormat(3324),
        description: 'Be the first of your friends to declare, \'I love where I work!\' and actually mean it. Laugh hard and work hard with some of the best and brightest in the tech industry. Our client has created the world\'s first marketplace for live experiences by developing the technology that lets anyone create, share and find new things to do. Currently 180 countries host events using their platform, with over 1.5 million events taking place every year and 5 million tickets being processed every month!',
        date: moment().format('YYYY.MM.DD.'),
        location: 'London'
    },
    {
        id: '5',
        title: 'Waitress',
        salary: priceFormat(3324),
        description: 'Be the first of your friends to declare, \'I love where I work!\' and actually mean it. Laugh hard and work hard with some of the best and brightest in the tech industry. Our client has created the world\'s first marketplace for live experiences by developing the technology that lets anyone create, share and find new things to do. Currently 180 countries host events using their platform, with over 1.5 million events taking place every year and 5 million tickets being processed every month!',
        date: moment().format('YYYY.MM.DD.'),
        location: 'London'
    },
];
const AdsList: NextPage = (props: any) => {
    return <BaseLayout auth={false} meta={{ title: 'jobs', keywords: 'jobs', description: 'jobs' }}>
        <div className={'row position-center mt-110'}>
            <div className={'col-20'}>
                <FilterColumn/>
            </div>
            <div className={'col-60 pl-40'}>
                <JobListings jobs={dummyJobs as any}/>
            </div>
        </div>

    </BaseLayout>;
};
export default AdsList;
