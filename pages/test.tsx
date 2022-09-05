import type { NextPage } from 'next';
import * as React from 'react';
import { CONSTANTS } from '../shared/constants';
import { Field } from '../shared/form/field';
import { FormStructure } from '../shared/form/form.structure';
import { Input } from '../shared/form/input';
import { useUrlManagerHook } from '../shared/hooks/url-manager-hook';

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
    const { addToUrl } = useUrlManagerHook();

    return <div className={'w-100 position-center'}>
        <div onClick={() => addToUrl('suck', Math.random().toString())} className={'w-px-300'}>
            <Input {...form?.fields?.industryType} namespace={form.namespace}/>
        </div>
    </div>;
};

export default Test;