import * as React from 'react';
import { useEffect, useState } from 'react';
import { timer } from 'rxjs';

export const UrlListener = (props: { urlChanged: () => void }) => {
    const [$timerObservable] = useState(timer(0, 1500));
    const [url, setUrl] = useState('');

    const checkUrl = () => {
        setUrl(window.location.search);
    };

    useEffect(() => {
        const sub = $timerObservable.subscribe(() => checkUrl());

        return () => sub.unsubscribe();
    }, []);

    useEffect(() => {
        props.urlChanged();
    }, [url]);

    return null;
};
