import type { NextPage } from 'next';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { EventManager } from '../components/event.manager';
import { CONSTANTS } from '../shared/constants';
import { Field } from '../shared/form/field';
import { FormStructure } from '../shared/form/form.structure';
import { Input } from '../shared/form/input';

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
    const ref = useRef(null);
    const [event, setEvent] = useState<EventManager>();
    useEffect(() => {
        const event = new EventManager('synthetic');
        setEvent(event);
    }, []);

    useEffect(() => {
        const ev = new EventManager('synthetic');

        ev?.subscribe(() => console.log('got listened'));
    }, []);

    return <div className={'w-100 position-center'}>
        <div onClick={() => event?.emit()} ref={ref} className={'w-px-300'}>
            <Input {...form?.fields?.industryType} namespace={form.namespace}/>
        </div>
    </div>;
};

export default Test;
