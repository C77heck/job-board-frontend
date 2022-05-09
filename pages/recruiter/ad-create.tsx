import { NextPage } from 'next';
import { BaseLayout } from '../../shared/layouts/base.layout';

const AdCreate: NextPage = (props: any) => {
    return <BaseLayout auth={false} meta={{ title: 'New post', keywords: 'whatever', description: 'some description' }}>
        <h1 className={'fs-55'}>New post</h1>
    </BaseLayout>;
};

export default AdCreate;
