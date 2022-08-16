import moment from 'moment';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FilterColumn } from '../components/AdsListScreen/Components/filter-column';
import { JobListings } from '../components/AdsListScreen/Components/job-listings';
import { Paginator } from '../shared/components/paginator/paginator';
import { useClient } from '../shared/hooks/client';
import { BaseLayoutWidth } from '../shared/layouts/base-layout-width';
import { BaseLayout } from '../shared/layouts/base.layout';
import { priceFormat } from '../shared/libs/helpers';

export const dummyJobs = [
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
    const { client, error } = useClient();
    const [paginatedData, setPaginatedData] = useState({
        items: [],
        limit: 5,
        total: 0,
        page: 0
    });

    const [pagination, setPagination] = useState({
        limit: 5,
        total: 0,
        page: 0
    });

    const getJobs = (data: any) => {
        setPaginatedData(data);
    };

    const paginate = (page: number) => {
        setPagination({ ...pagination, page });
    };

    const getJobAds = async () => {
        try {
            const response = await client('/ads/get-all-ads');

            if (!response) {
                throw new Error('Something went wrong');
            }

            setPaginatedData(response);
        } catch (e) {
            console.log(e, error);
        }
    };

    useEffect(() => {
        (async () => await getJobAds())();
    }, []);

    return <BaseLayout auth={false} meta={{ title: 'jobs', keywords: 'jobs', description: 'jobs' }}>
        <BaseLayoutWidth>
            <div className={'row position-center mt-150 mb-50'}>
                <div className={'col-20'}>
                    <FilterColumn passData={(data: any) => getJobs(data)}/>
                </div>
                <div className={'col-80 pl-40'}>
                    <JobListings jobs={paginatedData.items}/>
                    <div className={'pt-80'}>
                        <Paginator
                            total={paginatedData.total}
                            currentPage={paginatedData.page}
                            fetchPage={paginate}
                        />
                    </div>
                </div>
            </div>
        </BaseLayoutWidth>
    </BaseLayout>;
};
export default AdsList;
