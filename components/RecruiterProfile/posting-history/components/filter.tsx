import * as React from 'react';
import { Input } from '../../../../shared/form/inputs/input';
import { useForm } from '../../../../shared/hooks/reducers/form-reducer.hook';

export interface FilterProps {
    name: string;
    label?: string;
    namespace: string;
}

export const Filter = (props: FilterProps) => {
    const { inputState: { inputs }, inputHandler } = useForm({
        inputs: {
            [props.name]: {
                value: '',
                valid: false
            },
        },
        isFormValid: false
    });

    return <Input
        name={props.name}
        label={props.label}
        className={'col-100 mt-11'}
        labelClass={'fs-15 fw--700 mb-2'}
        onChange={inputHandler}
        value={inputs[props.name].value}
        validators={[]}
    />;
};
