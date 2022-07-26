import { useClient } from '../../shared/hooks/client';
import { JobForm } from './forms/job.form';

export const NewJobPosting = () => {
    const client = useClient();

    const submit = async (data: any) => {
        const response: any = await client.client(`/ads/create-new-ad`, 'POST', { body: data });
        console.log(response);
    };

    return <div className={'w-100 px-30 pt-20 pb-100'}>
        <JobForm submit={(data: any) => submit(data)}/>
    </div>;
};
