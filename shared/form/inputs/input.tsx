import React, { RefObject, useCallback } from 'react';
import { CONSTANTS } from '../../constants';
import { DispatchFunction } from '../../hooks/reducers/form-reducer.hook';
import { useInput } from '../../hooks/reducers/input-reducer.hook';
import { ValidatorInterface } from '../validators/validator-interface';

import { Checkbox } from './checkbox';
import { Datepicker } from './datepicker';
import { InputWrapper } from './libs/input-wrapper';
import { MultiSearchableDropdown } from './multi-searchable-dropdown';
import { RangeInput } from './range-input';
import { OptionProps, SearchableDropdown } from './searchable-dropdown';
import { TextInput } from './text-input';
import { Textarea } from './textarea';

export interface FieldProps<TOptions = string[]> {
    type?: string;
    name: string;
    id?: string | undefined;
    readOnly?: boolean;
    required?: boolean;
    placeholder?: string;
    autoComplete?: string | undefined;
    disabled?: boolean | undefined;
    className?: string | undefined;
    inputClasses?: string;
    validators: any[];
    errorMessage?: string;
    label?: string;
    options?: OptionProps[];
    element?: 'text' | 'dropdown' | 'searchable_dropdown' | 'textarea' | 'checkbox' | 'datepicker' | string;
    isNumberOnly?: boolean;
    value: string | string[] | null | OptionProps | OptionProps[];
    onChange: DispatchFunction<any>;
    labelClass?: string;
    wrapperClasses?: string;
    rows?: number;
    cols?: number;
}

export const Input = (props: FieldProps) => {
    const { state, handleDataChange, focusChange } = useInput({ hasError: false, isInFocus: true, errorMessage: '' });
    const prodRef: RefObject<HTMLDivElement> = React.createRef();
    const { INPUTS } = CONSTANTS;

    const removeNonNumericValues = useCallback((value: string) => {
        const isNumeric = /^-?\d*\.?\d*$/;
        return value.split('').filter(v => isNumeric.test(v)).join('');
    }, []);

    const validate = (value: string): ValidatorInterface => {
        const hasErrors = !!props.validators && !!props.validators.length
            ? props.validators.map((validator: any) => validator(value)).filter((res: ValidatorInterface) => res.hasError)
            : [];

        if (!hasErrors.length) {
            return { hasError: false, errorMessage: '' };
        }

        return hasErrors[0];
    };

    const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        const { hasError, errorMessage } = validate(value);
        const val = props.isNumberOnly ? removeNonNumericValues(value) : value;
        props.onChange({
            value: val,
            valid: !hasError,
            inputName: props.name
        });
        handleDataChange({ hasError, errorMessage });
    };

    const singleOnClickHandler = (isChosen: boolean, option: OptionProps) => {
        props.onChange({
            value: isChosen ? '' : option,
            valid: !state.hasError,
            inputName: props.name
        });
    };

    const multiOnClickHandler = (options: OptionProps[]) => {
        props.onChange({
            value: options,
            valid: !state.hasError,
            inputName: props.name
        });
    };

    const manageInputType = (element: string) => {
        switch (element) {
            case INPUTS.DROPDOWN:
                return <TextInput
                    onFocus={() => focusChange(true)}
                    onBlur={() => focusChange(false)}
                    {...props}
                    handleChange={handleChange}
                    value={props.value}
                />; // will need the dropdown
            case INPUTS.SEARCHABLE_DROPDOWN:
                return <SearchableDropdown
                    currentValue={''}
                    options={props?.options || []}
                    {...props}
                    handleChange={handleChange}
                    value={props.value as OptionProps}
                    onClickHandler={(isChosen: boolean, option: OptionProps) => singleOnClickHandler(isChosen, option)}
                />;
            case INPUTS.MULTI_SEARCHABLE_DROPDOWN:
                return <MultiSearchableDropdown
                    options={props?.options || []}
                    {...props}
                    handleChange={handleChange}
                    value={props.value as OptionProps[]}
                    onClickHandler={(options: OptionProps[]) => multiOnClickHandler(options)}
                />;
            case INPUTS.TEXTAREA:
                return <Textarea
                    onFocus={() => focusChange(true)}
                    onBlur={() => focusChange(false)}
                    {...props}
                    handleChange={handleChange}
                    value={props.value}
                />;  // will need the textarea
            case INPUTS.RANGE:
                return <RangeInput
                    {...props}
                    handleChange={handleChange}
                    value={props.value}
                />;
            case INPUTS.CHECKBOX:
                return <Checkbox
                    {...props}
                    handleChange={handleChange}
                    value={props.value}
                />;
            case INPUTS.DATEPICKER:
                return <Datepicker
                    onFocus={() => focusChange(true)}
                    onBlur={() => focusChange(false)}
                    {...props}
                    handleChange={handleChange}
                    value={props.value}
                />;
            default:
                return <TextInput
                    onFocus={() => focusChange(true)}
                    onBlur={() => focusChange(false)}
                    {...props}
                    handleChange={handleChange}
                    value={props.value}
                />;
        }
    };

    const element = props?.element || '';

    switch (element) {
        case INPUTS.CHECKBOX:
            return manageInputType(element);
        case INPUTS.TEXTAREA:
            return manageInputType(element);
        case INPUTS.SEARCHABLE_DROPDOWN:
            return <InputWrapper {...props} {...{ prodRef, ...state }} isOverflowHidden={true}>{manageInputType(element)}</InputWrapper>;
        case INPUTS.MULTI_SEARCHABLE_DROPDOWN:
            return <InputWrapper {...props} {...{ prodRef, ...state }} isOverflowHidden={true}>{manageInputType(element)}</InputWrapper>;
        default:
            return <InputWrapper {...props} {...{ prodRef, ...state }}>{manageInputType(element)}</InputWrapper>;
    }
};
