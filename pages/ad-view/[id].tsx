import { NextPage } from 'next';
import { useRouter, withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Job } from '../../components/AdsListScreen/Components/job-listings';
import { AdCard } from '../../components/AdViewScreen/ad-card';
import { SimilarAds } from '../../components/AdViewScreen/similar-ads';
import { Hr } from '../../shared/components/ui-misc/hr';
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
            const response = await client(`/ads/get-by-id/${router.query.id}`);

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

    return <BaseLayout className={'background-color--light-2'} showSearchBar={true} auth={false} meta={{ title: 'jobs', keywords: 'jobs', description: 'jobs' }}>
        <BaseLayoutWidth>
            <div className={'row position-center mt-220 mb-50'}>
                <div className={'w-80 background-color--light-1 p-20 display-flex flex-column'}>
                    <AdCard isLoading={isLoading} data={adData} adId={router.query.id as string}/>
                    <Hr className={'mt-30'}/>

                    <div className={'w-100 position-center flex-column'}>
                        <SimilarAds adId={router.query.id as string}/>
                        <Hr className={'my-20'}/>
                        <div className={'w-100'}>
                    <span>
                        <span className={'fw--700'}>Please note: </span>
                         You should never need to provide bank account details or any other financial information,
                        or make any form of payment, when applying for a job. If you are ever asked to do this by a recruiter on our site please contact us with the advertiser&apos;s company name and the title of the job vacancy.
                    </span>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayoutWidth>;
    </BaseLayout>;
});

export default Id;
