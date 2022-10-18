import React, { RefObject, useCallback, useState } from 'react';
import { CONSTANTS } from '../constants';
import { DispatchFunction } from '../hooks/reducers/form-reducer.hook';
import { Checkbox } from './checkbox';
import { Datepicker } from './datepicker';
import { RangeInput } from './range-input';
import { OptionProps, SearchableDropdown } from './searchable-dropdown';
import { TextInput } from './text-input';
import { Textarea } from './textarea';
import { ValidatorInterface } from './validators/validator-interface';

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
    options?: any[];
    element?: 'text' | 'dropdown' | 'searchable' | 'searchable_dropdown' | 'textarea' | 'checkbox' | 'datepicker' | string;
    isNumberOnly?: boolean;
    value: string | string[] | null | OptionProps;
    onChange: DispatchFunction<any>;
    labelClass?: string;
    wrapperClasses?: string;
    rows?: number;
    cols?: number;
}

interface NormalWrapperProps extends FieldProps {
    prodRef: RefObject<any>;
    hasError: boolean;
    errorMessage: string;
    children: any;
    isInFocus: boolean;
    isOverflowHidden?: boolean;
}

const InputWrapper = (props: NormalWrapperProps) => {
    const errorClass = `error-${props.hasError && !props.isInFocus ? 'show' : 'hide'}--div`;
    const overflowClass = `${props.isOverflowHidden ? '' : 'overflow-hidden'}`;
    const wrapperClasses = `position-center input-wrapper ${props.wrapperClasses} ${errorClass} ${overflowClass}`;
    return <div
        className={`display-flex flex-column ${props.className}`}
        ref={props.prodRef}
    >
        {props.label && <label
            className={`input-label error-${props.hasError && !props.isInFocus ? 'show' : 'hide'}--label ${props.labelClass}`}
            htmlFor={props.name}
        >
            {props.label}
        </label>}
        <div className={wrapperClasses}>
            {props.children}
        </div>
        {!!props.hasError && !props.isInFocus && <small className={'error-show'}>{props.errorMessage || props.errorMessage}</small>}
    </div>;
};

export const Input = (props: FieldProps) => {
    const [hasError, setHasError] = useState(false);
    const [isInFocus, setIsInFocus] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
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
        props.onChange({ value: val, valid: !hasError, inputName: props.name });
        setHasError(hasError);
        setErrorMessage(errorMessage);
    };

    const onClickHandler = (isChosen: boolean, option: OptionProps) => {
        props.onChange({ value: isChosen ? '' : option.value, valid: !hasError, inputName: props.name });
    };

    const manageInputType = (element: string) => {
        switch (element) {
            case INPUTS.DROPDOWN:
                return <TextInput
                    onFocus={() => setIsInFocus(true)}
                    onBlur={() => setIsInFocus(false)}
                    {...props}
                    handleChange={handleChange}
                    value={props.value}
                />; // will need the dropdown
            case INPUTS.SEARCHABLE:
                return <TextInput
                    onFocus={() => setIsInFocus(true)}
                    onBlur={() => setIsInFocus(false)}
                    {...props}
                    handleChange={handleChange}
                    value={props.value}
                />; // will need the dropdown
            case INPUTS.SEARCHABLE_DROPDOWN:
                return <SearchableDropdown
                    currentValue={'something'}
                    {...props}
                    handleChange={handleChange}
                    value={props.value as OptionProps}
                    onClickHandler={(isChosen: boolean, option: OptionProps) => onClickHandler(isChosen, option)}
                />;
            case INPUTS.TEXTAREA:
                return <Textarea
                    onFocus={() => setIsInFocus(true)}
                    onBlur={() => setIsInFocus(false)}
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
                    onFocus={() => setIsInFocus(true)}
                    onBlur={() => setIsInFocus(false)}
                    {...props}
                    handleChange={handleChange}
                    value={props.value}
                />;
            default:
                return <TextInput
                    onFocus={() => setIsInFocus(true)}
                    onBlur={() => setIsInFocus(false)}
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
            return <InputWrapper {...props} {...{ prodRef, hasError, errorMessage, isInFocus }} isOverflowHidden={true}>{manageInputType(element)}</InputWrapper>;
        default:
            return <InputWrapper {...props} {...{ prodRef, hasError, errorMessage, isInFocus }}>{manageInputType(element)}</InputWrapper>;
    }
};
