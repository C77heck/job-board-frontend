import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { NewJobPosting } from '../../components/RecruiterProfile/new-job-posting';
import { PostingHistory } from '../../components/RecruiterProfile/posting-history/posting-history';
import { Tab, TabViewer } from '../../components/RecruiterProfile/tab-viewer';
import { UserData } from '../../components/RecruiterProfile/user-data';
import { BaseLayoutWidth } from '../../shared/layouts/base-layout-width';
import { BaseLayout } from '../../shared/layouts/base.layout';
import { Storage } from '../../shared/libs/storage';

const RecruiterDashboard: NextPage = (props: any) => {
    const storage = new Storage('tab');
    const [defaultTab, setDefaultTab] = useState();

    const tabs: Tab = {
        tabNames: [
            { display: 'New posting', value: 'new-postings' },
            { display: 'Profile infos', value: 'profile-infos' },
            { display: 'Job posting history', value: 'my-job-postings' }
        ],
        elements: {
            'new-postings': <NewJobPosting/>,
            'profile-infos': <UserData/>,
            'my-job-postings': <PostingHistory/>
        }
    };

    useEffect(() => {
        setDefaultTab(storage.get() ?? 'profile-infos');
    }, []);

    return <BaseLayout auth={false} meta={{ title: 'home page', keywords: 'whatever', description: 'some description' }}>
        <BaseLayoutWidth className={'min-screen-height justify-content-start pt-150'}>
            <h1 className={'pb-40 fs-40'}>My profile</h1>
            {defaultTab && <TabViewer onChange={(tab) => storage.set(tab)} default={defaultTab} tabs={tabs}/>}
        </BaseLayoutWidth>
    </BaseLayout>;
};
export default RecruiterDashboard;
