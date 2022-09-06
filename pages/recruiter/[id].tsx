import { NextPage } from 'next';
import { useRouter, withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Job } from '../../components/AdsListScreen/Components/job-listings';
import { useClient } from '../../shared/hooks/client';
import { BaseLayoutWidth } from '../../shared/layouts/base-layout-width';
import { BaseLayout } from '../../shared/layouts/base.layout';
import { handleErrors } from '../../shared/libs/handle-errors';

const Id: NextPage = withRouter((props: any) => {
    const router = useRouter();
    const { client, isLoading, error } = useClient();
    const [adData, setAdData] = useState<Job | null>(null);

    const getAd = async () => {
        try {
            const response = await client(`/recruiter/get-by-id/${router.query.id}`);

            setAdData(response.payload);
        } catch (e) {
            handleErrors(e, error);
        }
    };

    useEffect(() => {
        if (router.query.id) {
            (async () => await getAd())();
        }
    }, [router]);

    return <BaseLayout showSearchBar={true} auth={false} meta={{ title: 'jobs', keywords: 'jobs', description: 'jobs' }}>
        <BaseLayoutWidth className={'background-color--light-2'}>
            <div className={'row position-center mt-220 mb-50'}>
                <div className={'w-80 background-color--light-1 p-20 display-flex flex-column'}>
                    something
                </div>
            </div>
        </BaseLayoutWidth>;
    </BaseLayout>;
});

export default Id;
