import * as React from 'react';
import { useEffect, useState } from 'react';
import { timer } from 'rxjs';

export const UrlListener = (props: { urlChanged: () => void }) => {
    const [$timerObservable] = useState(timer(0, 300));
    const [url, setUrl] = useState('');

    const checkUrl = () => {
        const searchUrl = window.location.search;
        if (url !== searchUrl) {
            setUrl(searchUrl);
        }
    };

    useEffect(() => {
        const sub = $timerObservable.subscribe(() => checkUrl());

        return () => sub.unsubscribe();
    }, []);

    useEffect(() => {
        if (!url) {
            return;
        }

        props.urlChanged();
    }, [url]);

    return null;
};
