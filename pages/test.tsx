import type { NextPage } from 'next';
import * as React from 'react';
import { useEffect } from 'react';
import { CONSTANTS } from '../shared/constants';
import { Field } from '../shared/form/field';
import { FormStructure } from '../shared/form/form.structure';
import { Input } from '../shared/form/input';
import { useEvent } from '../shared/hooks/event-hook';

export interface TestObservable {
    name: string;
    date: Date;
}

const Test: NextPage = () => {
    const form = new FormStructure({
        industryType: new Field({
            name: 'industryType',
            label: 'Type of industry',
            value: '',
            options: CONSTANTS.OPTIONS.INDUSTRY_TYPE,
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
            element: 'searchable_dropdown',
        }),
    }, 'something');
    const { event, emit, unsubscribe, subscribe } = useEvent('synthetic');
    useEffect(() => {
        subscribe((e) => console.log('hook getting triggered', (e as CustomEvent).detail));

        return () => unsubscribe();
    }, []);

    return <div className={'w-100 position-center'}>
        <div onClick={() => emit({ what: 'that' })} className={'w-px-300'}>
            <Input {...form?.fields?.industryType} namespace={form.namespace}/>
        </div>
    </div>;
};

export default Test;
