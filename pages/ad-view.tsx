import { NextPage } from 'next';
import { useRouter, withRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { SessionContext } from '../shared/contexts/session.context';
import { BaseLayoutWidth } from '../shared/layouts/base-layout-width';
import { BaseLayout } from '../shared/layouts/base.layout';

const AdView: NextPage = withRouter((props: any) => {
    const { sessionId, sendViewEvent } = useContext(SessionContext);
    const router = useRouter();
    console.log(router, router.pathname, router.query);
    // TODO  const router = useRouter()
    // WILL NEED THE AD ID FROM THE URL

    useEffect(() => {
        if (props?.id) {
            (async () => await sendViewEvent(sessionId))();
        }
    }, []);

    return <BaseLayout auth={false} meta={{ title: 'jobs', keywords: 'jobs', description: 'jobs' }}>
        <BaseLayoutWidth>
            some text
        </BaseLayoutWidth>
    </BaseLayout>;
});

export default AdView;
