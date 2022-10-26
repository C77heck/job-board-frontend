import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Job } from '../../components/AdsListScreen/Components/job-listings';
import { JobSeekerRegisterForm } from '../../shared/components/navigation/forms/job-seeker-register.form';
import { useClient } from '../../shared/hooks/client.hook';
import { BaseLayoutWidth } from '../../shared/layouts/base-layout-width';
import { BaseLayout } from '../../shared/layouts/base.layout';
import { handleErrors } from '../../shared/libs/handle-errors';

const Registration: NextPage = (props: any) => {
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
                <JobSeekerRegisterForm endpoint={`/users/job-seeker/signup`}/>
            </div>
        </BaseLayoutWidth>;
    </BaseLayout>;
};

export default Registration;
