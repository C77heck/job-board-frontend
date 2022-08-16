import { NextPage } from 'next';
import { useRouter, withRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { SessionContext } from '../../shared/contexts/session.context';
import { useClient } from '../../shared/hooks/client';
import { useSession } from '../../shared/hooks/session-hook';
import { BaseLayoutWidth } from '../../shared/layouts/base-layout-width';
import { BaseLayout } from '../../shared/layouts/base.layout';

const Id: NextPage = withRouter((props: any) => {
    const { sessionId } = useContext(SessionContext);
    const { sendViewEvent } = useSession();
    const router = useRouter();
    const { client } = useClient();

    const getAd = async () => {
        try {
            const response = await client(`/ads/get-by-id/${router.query.id}`);

            console.log(response);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (router.query.id) {
            (async () => await sendViewEvent(sessionId, router.query.id as string))();
            (async () => await getAd())();
        }
    }, []);

    return <BaseLayout auth={false} meta={{ title: 'jobs', keywords: 'jobs', description: 'jobs' }}>
        <BaseLayoutWidth>
            some text
        </BaseLayoutWidth>
    </BaseLayout>;
});

export default Id;
