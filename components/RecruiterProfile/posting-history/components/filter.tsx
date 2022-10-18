import * as React from 'react';
import { Field } from '../../../../shared/form/field';
import { FormStructure } from '../../../../shared/form/form.structure';
import { Input } from '../../../../shared/form/old-input';

export interface FilterProps {
    name: string;
    label?: string;
    namespace: string;
}

export const Filter = (props: FilterProps) => {
    const form = new FormStructure({
        [props.name]: new Field({
            name: props.name,
            label: props.label,
            value: '',
            className: 'col-100 mt-11',
            labelClass: 'fs-15 fw--700 mb-2',
        }),
    }, props.namespace);

    return <Input {...form?.fields?.first_name} namespace={form.namespace}/>;
};
